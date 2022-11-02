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
import { useLocation } from 'react-router-dom';

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
  const search = useLocation().search;

  const contentRouter = () => {
    const inTournament = Boolean(tournament?.players.includes(me?._id || ''));

    if (!inTournament && !loading) {
      return <Redirect to={{ pathname: Page.Home, search }} />;
    }

    if (tournament.status === TournamentStatus.Completed) {
      return <CompletedPage tournamentId={tournament._id} />;
    }

    if (tournament.status === TournamentStatus.Created) {
      return <Redirect to={{ pathname: Page.Home, search }} />;
    }

    if (myMatch) {
      return (
        <MatchPage match={myMatch} organizationId={tournament.organizationId} />
      );
    }

    return (
      <WaitingPage tournamentStarted={Boolean(tournament.rounds.length)} />
    );
  };

  // todo maybe hide loading for when the match is null but not undefined?

  return (
    <>
      {myMatchLoading && !myMatch ? (
        <Spinner />
      ) : (
        <Box
          sx={{ height: '100%', width: '100%' }}
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
