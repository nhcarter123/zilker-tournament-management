import React, { useContext } from 'react';
import { Redirect } from 'react-router';

import Spinner from 'components/Spinner';
import WaitingPage from 'components/pages/AppPage/TournamentPage/PlayPage/WaitingPage';
import CompletedPage from 'components/pages/AppPage/TournamentPage/PlayPage/CompletedPage';
import MatchPage from 'components/pages/AppPage/TournamentPage/PlayPage/MatchPage';
import { Box } from '@mui/material';

import { UserContext } from 'context/userContext';
import { MatchWithUserInfo, Tournament, TournamentStatus } from 'types/types';
import { Page } from 'types/page';

interface PlayPageProps {
  tournament: Tournament;
  loading: boolean;
  myMatch: Nullable<MatchWithUserInfo>;
  myMatchLoading: boolean;
}

const PlayPage = ({
  tournament,
  loading,
  myMatch,
  myMatchLoading
}: PlayPageProps): JSX.Element => {
  const me = useContext(UserContext);

  const contentRouter = () => {
    const inTournament = Boolean(tournament?.players.includes(me?._id || ''));

    if (!inTournament && !loading) {
      return <Redirect to={Page.Tournaments} />;
    }

    if (tournament.status === TournamentStatus.Completed) {
      return <CompletedPage tournamentId={tournament._id} />;
    }

    if (myMatch) {
      return <MatchPage match={myMatch} />;
    }

    return (
      <WaitingPage tournamentStarted={Boolean(tournament.rounds.length)} />
    );
  };

  return (
    <>
      {myMatchLoading && !myMatch ? (
        <Spinner />
      ) : (
        <Box
          sx={{ height: '100%' }}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          {contentRouter()}
        </Box>
      )}
    </>
  );
};

export default PlayPage;
