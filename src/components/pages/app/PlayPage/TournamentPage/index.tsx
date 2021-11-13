import React from 'react';
import { Route } from 'react-router-dom';

import MatchPage from 'components/pages/app/PlayPage/TournamentPage/MatchPage';
import WaitingPage from 'components/pages/app/PlayPage/TournamentPage/WaitingPage';

import { Tournament, User } from 'types/types';
import { Pages } from 'types/pages';
import { useStyles } from 'components/pages/app/PlayPage/TournamentPage/styles';
import { Box, Typography } from '@mui/material/';

interface PlayPageProps {
  me: User;
  tournament: Tournament;
}

const TournamentPage = ({ me, tournament }: PlayPageProps): JSX.Element => {
  const classes = useStyles();

  const roundsCompleted = tournament.rounds.filter((round) => round.completed);

  return (
    <>
      <div className={classes.header}>
        <Typography variant={'h5'} align={'center'}>
          {tournament?.name}
        </Typography>
        <Box display={'flex'}>
          <Box mr={1}>
            <Typography variant={'subtitle2'}>
              {`${tournament.players.length} player${
                tournament.players.length !== 1 ? 's' : ''
              }`}
            </Typography>
          </Box>
          <Typography variant={'subtitle2'}>
            {`${roundsCompleted.length} round${
              roundsCompleted.length !== 1 ? 's' : ''
            } completed`}
          </Typography>
        </Box>
      </div>

      <Route
        path={Pages.waiting}
        render={(): JSX.Element => <WaitingPage tournament={tournament} />}
      />
      <Route
        path={Pages.match}
        render={(): JSX.Element => (
          <MatchPage me={me} tournament={tournament} />
        )}
      />
    </>
  );
};

export default TournamentPage;
