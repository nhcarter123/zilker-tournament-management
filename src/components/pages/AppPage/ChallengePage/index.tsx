import React, { useContext } from 'react';
import { Box } from '@mui/material/';
import MatchPage from 'components/pages/AppPage/TournamentPage/PlayPage/MatchPage';
import { MatchResult, MatchWithUserInfo, Role } from 'types/types';
import { UserContext } from 'context/userContext';
import { Page } from 'types/page';
import { Redirect } from 'react-router';
import { useHistory } from 'react-router-dom';
import Spinner from 'components/Spinner';

interface IChallengePageProps {
  myChallengeMatchLoading: boolean;
  myChallengeMatch: Nullable<MatchWithUserInfo>;
}

const ChallengePage = ({
  myChallengeMatchLoading,
  myChallengeMatch
}: IChallengePageProps): JSX.Element => {
  const me = useContext(UserContext);
  const history = useHistory();

  if (!me) {
    return (
      <Redirect
        to={{
          pathname: Page.Login,
          search: `?page=${Page.Challenge}${history.location.search}`
        }}
      />
    );
  }

  const emptyMatch: MatchWithUserInfo = {
    _id: '',
    tournamentId: null,
    hostId: null,
    white: {
      _id: me._id,
      firstName: me.firstName,
      lastName: me.lastName,
      phone: '123123',
      rating: me.rating,
      matchesPlayed: me.matchesPlayed,
      role: Role.Player,
      organizationId: me.organizationId,
      token: null,
      photo: null,
      challenge: null
    },
    black: null,
    whiteRating: me.rating,
    whiteScore: 0,
    blackScore: 0,
    whiteMatchesPlayed: 0,
    blackMatchesPlayed: 0,
    result: MatchResult.DidNotStart,
    completed: false
  };

  return (
    <Box height={'100%'}>
      {myChallengeMatchLoading ? (
        <Spinner />
      ) : (
        <MatchPage
          match={myChallengeMatch || emptyMatch}
          organizationId={'123'}
          isChallenge
        />
      )}
    </Box>
  );
};

export default ChallengePage;
