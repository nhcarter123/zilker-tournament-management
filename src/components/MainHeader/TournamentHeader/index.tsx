import React from 'react';
import { Box, Typography } from '@mui/material';
import { useQuery } from '@apollo/client';
import { Tournament } from 'types/types';
import { GET_ACTIVE_TOURNAMENT } from 'graphql/queries/queries';
import { useStyles } from 'components/MainHeader/TournamentHeader/styles';

const TournamentHeader = (): JSX.Element => {
  const classes = useStyles();
  const { data } = useQuery<{
    getActiveTournament: Nullable<Tournament>;
  }>(GET_ACTIVE_TOURNAMENT, {
    // pollInterval: 4000
  });

  const tournament = data?.getActiveTournament;

  if (!tournament) {
    return <></>;
  }

  const currentRound = tournament.rounds.length;
  const totalRounds = tournament.totalRounds;

  return (
    <Box className={classes.root}>
      <Typography className={classes.noWrap} variant={'h5'}>
        {tournament?.name}
      </Typography>

      <Box display={'flex'} alignItems={'center'} className={classes.noWrap}>
        <Box mr={1}>
          {currentRound > 0 && (
            <Typography variant={'h6'}>{`Round ${currentRound}`}</Typography>
          )}
        </Box>

        <Box className={classes.noWrap}>
          <Typography className={classes.noWrap} variant={'subtitle2'}>
            {`(${tournament.players.length} player${
              tournament.players.length !== 1 ? 's' : ''
            } ${totalRounds} rounds)`}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default TournamentHeader;
