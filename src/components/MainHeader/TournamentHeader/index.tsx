import React from 'react';
import { Box, Typography } from '@mui/material';
import { useQuery } from '@apollo/client';
import { Tournament } from 'types/types';
import { GET_TOURNAMENT } from 'graphql/queries/queries';
import { useStyles } from 'components/MainHeader/TournamentHeader/styles';
import { useParams } from 'react-router-dom';

const TournamentHeader = (): JSX.Element => {
  const classes = useStyles();
  const { tournamentId } = useParams<{ tournamentId: string }>();

  const { data } = useQuery<{
    getTournament: Nullable<Tournament>;
  }>(GET_TOURNAMENT, {
    notifyOnNetworkStatusChange: true,
    variables: {
      tournamentId
    }
  });

  const tournament = data?.getTournament;

  if (!tournament) {
    return <Box sx={{ height: '64px' }} />;
  }

  const currentRound = tournament.rounds.length;
  const totalRounds = tournament.totalRounds;

  return (
    <Box className={classes.root}>
      <Typography className={classes.noWrap} variant={'h5'}>
        {tournament?.name}
      </Typography>

      <Box display={'flex'} alignItems={'center'} className={classes.noWrap}>
        {currentRound > 0 && (
          <Box mr={1}>
            <Typography variant={'h6'}>{`Round ${currentRound}`}</Typography>
          </Box>
        )}

        <Box display={'flex'} className={classes.noWrap}>
          <Typography variant={'subtitle2'}>
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
