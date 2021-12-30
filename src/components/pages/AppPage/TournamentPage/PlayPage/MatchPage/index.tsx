import React from 'react';
import { useSubscription } from '@apollo/client';
import { useMediaQuery } from 'react-responsive';

import Player from 'components/Player';
import MatchResultSelect from 'components/MatchResultSelect';

import ChessBoard from 'svg/chessBoard.svg';

import { useStyles } from 'components/pages/AppPage/TournamentPage/PlayPage/MatchPage/styles';
import { Box, Divider, Typography } from '@mui/material';
import { MatchWithUserInfo } from 'types/types';
import { MATCH_UPDATED } from 'graphql/subscriptions/subscriptions';

interface MatchPageProps {
  match: MatchWithUserInfo;
}

const MatchPage = ({ match }: MatchPageProps): JSX.Element => {
  const shortWindow = useMediaQuery({ query: '(max-height: 590px)' });
  const classes = useStyles();

  const { data: updatedMatchData } = useSubscription<{
    matchUpdated: Nullable<Partial<MatchWithUserInfo>>;
  }>(MATCH_UPDATED, {
    variables: { matchIds: [match._id] }
  });

  const whitePlayer = match.white;
  const blackPlayer = match.black;
  const mergedMatch = {
    ...match,
    ...(updatedMatchData?.matchUpdated || {})
  };

  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      width={'100%'}
    >
      {!whitePlayer || !blackPlayer || !mergedMatch ? (
        <div>
          <Typography>You have a bye this round 😑</Typography>
          <Typography>You’ll be playing again next round!</Typography>
        </div>
      ) : (
        <Box sx={{ width: '100%' }} pt={2}>
          <Player
            player={blackPlayer}
            ratingBefore={mergedMatch.blackRating}
            ratingAfter={mergedMatch.newBlackRating}
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
              <div className={classes.boardNumber}>
                <Typography variant="h6">{`#${mergedMatch.boardNumber}`}</Typography>
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
            ratingBefore={mergedMatch.whiteRating}
            ratingAfter={mergedMatch.newWhiteRating}
            hideAvatar={shortWindow}
          />

          <Divider />

          <MatchResultSelect match={mergedMatch} />
        </Box>
      )}
    </Box>
  );
};

export default MatchPage;
