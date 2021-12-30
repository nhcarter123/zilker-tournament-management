import React from 'react';
import { Redirect } from 'react-router';
import { useLocation } from 'react-router-dom';

import { Box } from '@mui/material';
import Spinner from 'components/Spinner';
import ViewTournamentPage from 'components/pages/AppPage/TournamentPage/ViewTournamentPage';
import PlayPage from 'components/pages/AppPage/TournamentPage/PlayPage';
import TournamentHeader from 'components/MainHeader/TournamentHeader';
import ViewMatchPage from 'components/pages/AppPage/TournamentPage/ViewMatchPage';
import LeaveTournamentButton from 'components/pages/AppPage/TournamentPage/LeaveTournamentButton';

import { Page } from 'types/page';
import { Tournament } from 'types/types';

interface TournamentPageProps {
  tournament: Nullable<Tournament>;
  loading: boolean;
  refetchTournament: Function;
}

const TournamentPage = ({
  tournament,
  loading,
  refetchTournament
}: TournamentPageProps): JSX.Element => {
  const page = useLocation().pathname;
  const contentRouter = () => {
    if (page.includes('view')) {
      if (page.includes('match')) {
        return <ViewMatchPage />;
      }

      return <ViewTournamentPage tournament={tournament} />;
    }

    if (tournament) {
      return (
        <PlayPage
          tournament={tournament}
          refetchTournament={refetchTournament}
        />
      );
    }

    return <Redirect to={Page.Tournaments} />;
  };

  return (
    <>
      {loading && !tournament ? (
        <Spinner />
      ) : (
        <>
          <TournamentHeader tournament={tournament} />
          {tournament && !page.includes('view') && (
            <LeaveTournamentButton tournamentId={tournament._id} />
          )}
          <Box
            sx={{ height: '100%' }}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            {contentRouter()}
          </Box>
        </>
      )}
    </>
  );
};

export default TournamentPage;
