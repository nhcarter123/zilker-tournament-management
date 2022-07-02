import React from 'react';
import { useSubscription } from '@apollo/client';
import { useMediaQuery } from 'react-responsive';

import Player from 'components/Player';
import MatchResultSelect from 'components/MatchResultSelect';

import ChessBoard from 'svg/chessBoard.svg';

import { useStyles } from 'components/pages/AppPage/TournamentPage/PlayPage/MatchPage/styles';
import { Box, Divider, Typography } from '@mui/material';
import {
  MatchUpdatedData,
  MatchUpdatedVariables,
  MatchWithUserInfo
} from 'types/types';
import { MATCH_UPDATED } from 'graphql/subscriptions/subscriptions';
import clsx from 'clsx';

interface MatchPageProps {
  match: MatchWithUserInfo;
}

const MatchPage = ({ match }: MatchPageProps): JSX.Element => {
  const shortWindow = useMediaQuery({ query: '(max-height: 590px)' });
  const classes = useStyles();

  useSubscription<MatchUpdatedData, MatchUpdatedVariables>(MATCH_UPDATED, {
    variables: { matchIds: [match._id] }
  });

  const whitePlayer = match.white;
  const blackPlayer = match.black;

  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      width={'100%'}
    >
      {!whitePlayer || !blackPlayer || !match ? (
        <div>
          <Typography>You have a bye this round 😑</Typography>
          <Typography>You’ll be playing again next round!</Typography>
        </div>
      ) : (
        <Box sx={{ width: '100%' }} pt={2}>
          <Player
            player={blackPlayer}
            ratingBefore={match.blackRating}
            ratingAfter={match.newBlackRating}
            hideAvatar={shortWindow}
          />

          <Box display={'flex'} justifyContent={'center'} mb={2}>
            <div
              style={{
                position: 'relative',
                border: '5px solid rgb(191 191 191)',
                borderRadius: '8px'
              }}
            >
              <div className={clsx(classes.whiteScore, classes.scoreNumber)}>
                <Typography variant="body1">{match.whiteScore}</Typography>
              </div>
              <div className={clsx(classes.blackScore, classes.scoreNumber)}>
                <Typography variant="body1">{match.blackScore}</Typography>
              </div>
              <div className={classes.boardNumber}>
                <Typography variant="h6">{`#${match.boardNumber}`}</Typography>
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

          <MatchResultSelect match={match} />
        </Box>
      )}
    </Box>
  );
};

export default MatchPage;
