import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_MATCH } from 'graphql/queries/queries';
import { useMediaQuery } from 'react-responsive';

import Spinner from 'components/Spinner';
import Player from 'components/Player';
import MatchResultSelect from 'components/MatchResultSelect';

import ChessBoard from 'svg/chessBoard.svg';

import { useStyles } from 'components/pages/AppPage/PlayPage/MatchPage/styles';
import { MatchWithUserInfo } from 'types/types';
import { Box, Divider, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

const MatchPage = (): JSX.Element => {
  const [loaded, setLoaded] = useState(false);
  const { matchId } = useParams<{ matchId: string }>();
  const shortWindow = useMediaQuery({ query: `(max-height: 590px)` });
  const classes = useStyles();

  // todo this !== 'bye' shit has to get abstracted to somewhere

  const { data: matchData, loading } = useQuery<{
    getMatch: Nullable<MatchWithUserInfo>;
  }>(GET_MATCH, {
    variables: { matchId },
    // fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    // pollInterval: 4000, // todo rewrite using subscriptions (who knew that was a thing??)
    onCompleted: () => setLoaded(true)
  });

  const whitePlayer = matchData?.getMatch?.white;
  const blackPlayer = matchData?.getMatch?.black;
  const match = matchData?.getMatch;

  return (
    <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
      {!loaded && loading ? (
        <Spinner />
      ) : !whitePlayer || !blackPlayer || !match ? (
        <div>
          <Typography>You don’t have an opponent for this round.</Typography>
          <Typography>
            You’ll have to wait until the next round... 😑
          </Typography>
        </div>
      ) : (
        <Box>
          <Player
            player={blackPlayer}
            ratingBefore={match.blackRating}
            ratingAfter={match.newBlackRating}
            hideAvatar={shortWindow}
          />

          <Box className={classes.boardContainer}>
            <div
              style={{
                position: 'relative',
                border: '5px solid rgb(191 191 191)',
                borderRadius: '8px'
              }}
            >
              <div className={classes.boardNumber}>
                <Typography
                  variant={'h6'}
                >{`#${match.boardNumber}`}</Typography>
              </div>
              <img
                src={ChessBoard}
                width={150}
                height={150}
                alt={'Chess board'}
              />
            </div>
          </Box>

          <Player
            player={whitePlayer}
            ratingBefore={match.whiteRating}
            ratingAfter={match.newWhiteRating}
            hideAvatar={shortWindow}
          />

          <Divider />

          <MatchResultSelect match={match} matchLoading={loading} />
        </Box>
      )}
    </Box>
  );
};

export default MatchPage;
