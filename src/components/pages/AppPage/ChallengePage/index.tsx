import React from 'react';
import { Box } from '@mui/material/';
import MatchPage from 'components/pages/AppPage/TournamentPage/PlayPage/MatchPage';
import { MatchResult, Role } from 'types/types';

const RulesPage = (): JSX.Element => {
  const match = {
    _id: '',
    tournamentId: '',
    white: {
      _id: '',
      firstName: 'Nate',
      lastName: 'C',
      phone: '123123',
      rating: 1234,
      matchesPlayed: 5,
      role: Role.Player,
      organizationId: ''
    },
    black: null,
    whiteRating: 1000,
    whiteScore: 0,
    blackScore: 0,
    whiteMatchesPlayed: 4,
    blackMatchesPlayed: 8,
    result: MatchResult.DidNotStart,
    completed: false
  };

  return (
    <Box height={'100%'}>
      <MatchPage match={match} organizationId={'123'} isChallenge />
    </Box>
  );
};

export default RulesPage;
