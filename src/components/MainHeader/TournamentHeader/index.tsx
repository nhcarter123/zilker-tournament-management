import React from 'react';
import { findIndex } from 'lodash';
import { matchPath, useLocation } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { Tournament } from 'types/types';
import { useStyles } from 'components/MainHeader/TournamentHeader/styles';
import { Page } from 'types/page';

interface TournamentHeaderProps {
  tournament: Nullable<Tournament>;
}

const TournamentHeader = ({
  tournament
}: TournamentHeaderProps): JSX.Element => {
  const classes = useStyles();
  const page = useLocation().pathname;
  const pathMatch = matchPath<{ matchId?: string }>(page, {
    path: Page.ViewMatch,
    exact: false,
    strict: false
  });

  const idFromRoute = pathMatch?.params.matchId;

  if (!tournament) {
    return <Box sx={{ height: '64px' }} />;
  }

  // Show round number from matchId if it is present
  const matchRound =
    findIndex(tournament.rounds, (round) =>
      round.matches.includes(idFromRoute || '')
    ) + 1;

  const currentRound = matchRound || tournament.rounds.length;
  const totalRounds = tournament.totalRounds;

  return (
    <Box className={classes.root}>
      <Typography className={classes.noWrap} variant={'h5'}>
        {tournament.name}
      </Typography>

      <Box display={'flex'} alignItems={'center'} className={classes.noWrap}>
        {currentRound > 0 && (
          <Box mr={1}>
            <Typography variant={'h6'}>{`Round ${currentRound}`}</Typography>
          </Box>
        )}

        <Box display={'flex'} className={classes.noWrap}>
          <Typography variant={'subtitle2'} className={classes.noWrap}>
            {`${tournament.players.length} player${
              tournament.players.length !== 1 ? 's' : ''
            } ${totalRounds} rounds`}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default TournamentHeader;
