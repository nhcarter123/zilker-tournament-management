import React from 'react';
import { Redirect, useLocation } from 'react-router';

import { Box } from '@mui/material';
import Spinner from 'components/Spinner';
import ViewTournamentPage from 'components/pages/AppPage/TournamentPage/ViewTournamentPage';
import PlayPage from 'components/pages/AppPage/TournamentPage/PlayPage';
import TournamentHeader from 'components/MainHeader/TournamentHeader';
import ViewMatchPage from 'components/pages/AppPage/TournamentPage/ViewMatchPage';
import LeaveTournamentButton from 'components/pages/AppPage/TournamentPage/LeaveTournamentButton';

import { MatchWithUserInfo, Tournament } from 'types/types';
import { Page } from 'types/page';

interface TournamentPageProps {
  tournament: Nullable<Tournament>;
  loading: boolean;
  myMatch: Nullable<MatchWithUserInfo>;
  myMatchLoading: boolean;
}

const TournamentPage = ({
  tournament,
  loading,
  myMatch,
  myMatchLoading
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
          loading={loading}
          myMatch={myMatch}
          myMatchLoading={myMatchLoading}
        />
      );
    }

    return <Redirect to={Page.Search} />;
  };

  return (
    <>
      {loading && !tournament ? (
        <Spinner />
      ) : (
        <>
          {tournament && !page.includes('view') && (
            <LeaveTournamentButton tournamentId={tournament._id} />
          )}
          <TournamentHeader tournament={tournament} />
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
