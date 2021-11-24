import React, { useState } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_MATCH, GET_USER } from 'graphql/queries/queries';
import { useMediaQuery } from 'react-responsive';

import Spinner from 'components/Spinner';
import Player from 'components/Player';
import MatchResultSelect from 'components/MachResultSelect';

import ChessBoard from 'svg/chessBoard.svg';

import { useStyles } from 'components/pages/AppPage/PlayPage/TournamentPage/MatchPage/styles';
import { Match, User } from 'types/types';
import { Box, Divider, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

const MatchPage = (): JSX.Element => {
  const [loaded, setLoaded] = useState(false);
  const { matchId } = useParams<{ matchId: string }>();
  const shortWindow = useMediaQuery({ query: `(max-height: 660px)` });
  const classes = useStyles();

  const [getWhitePlayer, { data: whitePlayerData }] = useLazyQuery<{
    getUser: Nullable<User>;
  }>(GET_USER);

  const [getBlackPlayer, { data: blackPlayerData }] = useLazyQuery<{
    getUser: Nullable<User>;
  }>(GET_USER);

  // todo this !== 'bye' shit has to get abstracted to somewhere

  const { data: matchData, loading } = useQuery<{
    getMatch: Nullable<Match>;
  }>(GET_MATCH, {
    variables: { matchId },
    // fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    // pollInterval: 4000, // todo rewrite using subscriptions (who knew that was a thing??)
    onCompleted: (data) => {
      setLoaded(true);

      if (data.getMatch?.white !== 'bye' && data.getMatch?.black !== 'bye') {
        if (data.getMatch) {
          getWhitePlayer({
            variables: {
              userId: data.getMatch.white
            }
          });

          getBlackPlayer({
            variables: {
              userId: data.getMatch.black
            }
          });
        }
      }
    }
  });

  const whitePlayer = whitePlayerData?.getUser;
  const blackPlayer = blackPlayerData?.getUser;
  const match = matchData?.getMatch;

  return (
    <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
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
        whitePlayer &&
        blackPlayer && (
          <Box sx={{ width: '210px' }}>
            <Player
              player={blackPlayer}
              ratingBefore={match.blackRating}
              ratingAfter={match.newBlackRating}
              hideAvatar={shortWindow}
            />

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

            <Player
              player={whitePlayer}
              ratingBefore={match.whiteRating}
              ratingAfter={match.newWhiteRating}
              hideAvatar={shortWindow}
            />

            <Divider />

            <MatchResultSelect match={match} matchLoading={loading} />
          </Box>
        )
      )}
    </Box>
  );
};

export default MatchPage;
