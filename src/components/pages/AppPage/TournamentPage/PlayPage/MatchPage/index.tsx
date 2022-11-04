import React from 'react';
import { useSubscription } from '@apollo/client';
import { useMediaQuery } from 'react-responsive';

import Player from 'components/Player';
import MatchResultSelect from 'components/MatchResultSelect';
import JoinMenu from 'components/JoinMenu';

import ChessBoard from 'image/chessBoard.svg';
import { MATCH_UPDATED } from 'graphql/definitions/subscriptions';
import { useStyles } from 'components/pages/AppPage/TournamentPage/PlayPage/MatchPage/styles';

import { Box, Typography } from '@mui/material';
import {
  MatchUpdatedData,
  MatchUpdatedVariables,
  MatchWithUserInfo
} from 'types/types';
import clsx from 'clsx';

interface MatchPageProps {
  match: MatchWithUserInfo;
  organizationId: string;
  isChallenge?: boolean;
}

const MatchPage = ({
  match,
  organizationId,
  isChallenge
}: MatchPageProps): JSX.Element => {
  const shortWindow = useMediaQuery({ query: '(max-height: 590px)' });
  const classes = useStyles();

  useSubscription<MatchUpdatedData, MatchUpdatedVariables>(MATCH_UPDATED, {
    variables: { matchIds: [match._id] }
  });

  const whitePlayer = match.white;
  const blackPlayer = match.black;

  const isBye = !isChallenge && (!whitePlayer || !blackPlayer);
  const allPlayersJoined = Boolean(whitePlayer && blackPlayer);

  return (
    <Box sx={{ position: 'relative', height: '100%', width: '100%' }}>
      <Box
        sx={{
          overflow: 'auto',
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        }}
      >
        {isBye ? (
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            height={'100%'}
          >
            <Box>
              <Typography>You have a bye this round 😑</Typography>
              <Typography>You’ll be playing again next round!</Typography>
            </Box>
          </Box>
        ) : (
          <Box sx={{ width: '100%' }} pt={2} mb={2}>
            <Player
              player={blackPlayer}
              ratingBefore={match.blackRating}
              ratingAfter={match.newBlackRating}
              hideAvatar={shortWindow}
            />

            <Box display={'flex'} justifyContent={'center'} mb={2}>
              {whitePlayer && blackPlayer ? (
                <div
                  style={{
                    position: 'relative',
                    border: '5px solid rgb(191 191 191)',
                    borderRadius: '8px'
                  }}
                >
                  <div
                    className={clsx(classes.whiteScore, classes.scoreNumber)}
                  >
                    <Typography variant="body1">{match.blackScore}</Typography>
                  </div>
                  <div
                    className={clsx(classes.blackScore, classes.scoreNumber)}
                  >
                    <Typography variant="body1">{match.whiteScore}</Typography>
                  </div>

                  {match.boardNumber && (
                    <div className={classes.boardNumber}>
                      <Typography variant="h6">{`#${match.boardNumber}`}</Typography>
                    </div>
                  )}

                  <img
                    src={ChessBoard}
                    width={150}
                    height={150}
                    alt={'Chess board'}
                  />
                </div>
              ) : (
                <JoinMenu />
              )}
            </Box>

            <Player
              player={whitePlayer}
              ratingBefore={match.whiteRating}
              ratingAfter={match.newWhiteRating}
              hideAvatar={shortWindow}
            />

            {allPlayersJoined && (
              <MatchResultSelect
                match={match}
                organizationId={organizationId}
              />
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MatchPage;
