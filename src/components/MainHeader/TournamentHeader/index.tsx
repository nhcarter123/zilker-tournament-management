import React from 'react';
import { Box, Typography } from '@mui/material';
import { Tournament } from 'types/types';
import { useStyles } from 'components/MainHeader/TournamentHeader/styles';

interface TournamentHeaderProps {
  tournament: Nullable<Tournament>;
}

const TournamentHeader = ({
  tournament
}: TournamentHeaderProps): JSX.Element => {
  const classes = useStyles();

  if (!tournament) {
    return <Box sx={{ height: '64px' }} />;
  }

  const currentRound = tournament.rounds.length;
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
