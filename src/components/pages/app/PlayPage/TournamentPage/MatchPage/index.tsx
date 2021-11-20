import React, { useState } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_MY_MATCH, GET_USER } from 'graphql/queries/queries';

import Spinner from 'components/Spinner';
import Player from 'components/Player';
import MatchResultSelect from 'components/MachResultSelect';

import ChessBoard from 'svg/chessBoard.svg';

import { useStyles } from 'components/pages/app/PlayPage/TournamentPage/MatchPage/styles';
import { Match, User } from 'types/types';
import { Box, Divider, Typography } from '@mui/material';

interface PlayPageProps {
  me: User;
}

const MatchPage = ({ me }: PlayPageProps): JSX.Element => {
  const [loaded, setLoaded] = useState(false);
  const classes = useStyles();

  const [getOpponent, { data: opponentData }] = useLazyQuery<{
    getUser: Nullable<User>;
  }>(GET_USER);

  // todo this !== 'bye' shit has to get abstracted to somewhere

  const { data: matchData, loading } = useQuery<{
    getMyMatch: Nullable<Match>;
  }>(GET_MY_MATCH, {
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    // pollInterval: 4000, // todo rewrite using subscriptions (who knew that was a thing??)
    onCompleted: (data) => {
      setLoaded(true);

      data.getMyMatch?.white &&
        data.getMyMatch?.white !== 'bye' &&
        data.getMyMatch?.black !== 'bye' &&
        getOpponent({
          variables: {
            userId:
              me._id === data.getMyMatch.white
                ? data.getMyMatch.black
                : data.getMyMatch.white
          }
        });
    }
  });

  const opponent = opponentData?.getUser;
  const match = matchData?.getMyMatch;

  return (
    <div className={classes.root}>
      {!loaded && loading ? (
        <Spinner />
      ) : match?.white === 'bye' || match?.black === 'bye' || !match ? (
        <div>
          <Typography>You don’t have an opponent for this round.</Typography>
          <Typography>
            You’ll have to wait until the next round... 😑
          </Typography>
        </div>
      ) : (
        opponent && (
          <div>
            <Player player={match.white === opponent._id ? me : opponent} />

            <Box className={classes.boardContainer}>
              <div className={classes.boardNumber}>
                <Typography
                  variant={'h6'}
                >{`#${match.boardNumber}`}</Typography>
              </div>
              <div
                style={{
                  border: '5px solid rgb(191 191 191)',
                  borderRadius: '8px'
                }}
              >
                <img
                  src={ChessBoard}
                  width={150}
                  height={150}
                  alt={'Chess board'}
                />
              </div>
            </Box>

            <Player player={match.white === opponent._id ? opponent : me} />

            <Divider />

            <MatchResultSelect match={match} />
          </div>
        )
      )}
    </div>
  );
};

export default MatchPage;
