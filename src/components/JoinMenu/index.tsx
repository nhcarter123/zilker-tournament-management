import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Box, LinearProgress, Typography } from '@mui/material/';
import QRCode from 'react-qr-code';
import Spinner from 'components/Spinner';
import { Page } from 'types/page';
import { useMutation } from '@apollo/client';
import { MatchWithUserInfo, User } from 'types/types';
import {
  JOIN_CHALLENGE,
  REFRESH_CHALLENGE
} from 'graphql/definitions/mutations';
import { useHistory } from 'react-router-dom';
import { GET_MY_CHALLENGE_MATCH } from 'graphql/definitions/queries';
import { UserContext } from 'context/userContext';
import { onError } from 'graphql/errorHandler';
import moment from 'moment';

const calcPercent = (expiresAt?: Date) => {
  const start = moment(expiresAt).subtract(5, 'minutes');
  const end = moment(expiresAt);
  const diff1 = moment(expiresAt).diff(moment());
  const diff2 = end.diff(start);
  return 100 - (100 * diff1) / diff2;
};

const JoinMenu = (): JSX.Element => {
  const me = useContext(UserContext);
  const myGameCode = me?.challenge?.gameCode;
  const expiresAt = me?.challenge?.expiresAt;
  const history = useHistory();
  const [mounted, setMounted] = useState(false);
  const [percent, setPercent] = useState(calcPercent(expiresAt));

  const queryParams = useMemo(
    () => new URLSearchParams(history.location.search),
    [history.location.search]
  );
  const opponentsGameCode = queryParams.get('gameCode');

  const [joinChallenge, { loading: joinChallengeLoading }] = useMutation<{
    joinChallenge: Nullable<MatchWithUserInfo>;
  }>(JOIN_CHALLENGE, {
    variables: {
      gameCode: opponentsGameCode
    },
    refetchQueries: [GET_MY_CHALLENGE_MATCH],
    awaitRefetchQueries: true,
    onError
  });

  const [refreshChallenge, { loading: refreshChallengeLoading }] = useMutation<{
    refreshChallenge: Nullable<User>;
  }>(REFRESH_CHALLENGE);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const tempPercent = calcPercent(expiresAt);
      setPercent(tempPercent);

      if (tempPercent > 100) {
        void refreshChallenge();
      }
    }, 500);

    return () => clearInterval(intervalId);
  }, [expiresAt, refreshChallenge]);

  useEffect(() => {
    void refreshChallenge();
    setMounted(true);
  }, [refreshChallenge]);

  useEffect(() => {
    if (opponentsGameCode) {
      queryParams.delete('gameCode');
      history.replace({
        search: queryParams.toString()
      });
      void joinChallenge();
    }
  }, [joinChallenge, opponentsGameCode, history, queryParams]);

  return (
    <Box display={'flex'} justifyContent={'center'}>
      <Box
        mt={1}
        sx={{
          borderRadius: '8px',
          border: '3px solid',
          borderColor: '#4f4f4f'
        }}
      >
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          height={'250px'}
          width={'210px'}
          p={1.5}
          pt={0.5}
        >
          {refreshChallengeLoading || joinChallengeLoading || !mounted ? (
            <Spinner />
          ) : (
            <Box
              width={'100%'}
              height={'100%'}
              display={'grid'}
              gridTemplateRows={'auto 1fr'}
            >
              <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
              >
                <Typography mr={1} variant={'body1'}>
                  Game code:
                </Typography>
                <Typography fontFamily={'Monospace'} variant={'h5'}>
                  {myGameCode}
                </Typography>
              </Box>

              <Box width={'100%'} pb={1} pt={0.2}>
                <LinearProgress variant="determinate" value={percent} />
              </Box>

              <Box display={'flex'} justifyContent={'center'}>
                <QRCode
                  value={`${process.env.REACT_APP_URL}${Page.Challenge}?gameCode=${myGameCode}`}
                  size={64}
                  style={{ height: 'auto', width: '100%' }}
                  viewBox={`0 0 64 64`}
                />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default JoinMenu;
