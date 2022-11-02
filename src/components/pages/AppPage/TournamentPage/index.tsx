import React from 'react';
import { Redirect, useLocation } from 'react-router';

import { Box } from '@mui/material';
import Spinner from 'components/Spinner';
import ViewTournamentPage from 'components/pages/AppPage/TournamentPage/ViewTournamentPage';
import PlayPage from 'components/pages/AppPage/TournamentPage/PlayPage';
import TournamentHeader from 'components/MainHeader/TournamentHeader';
import ViewMatchPage from 'components/pages/AppPage/TournamentPage/ViewMatchPage';

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
  const { pathname, search } = useLocation();
  const contentRouter = () => {
    if (tournament) {
      if (pathname.includes('view')) {
        if (pathname.includes('match')) {
          return <ViewMatchPage organizationId={tournament.organizationId} />;
        }

        return <ViewTournamentPage tournament={tournament} />;
      }

      return (
        <PlayPage
          tournament={tournament}
          loading={loading}
          myMatch={myMatch}
          myMatchLoading={myMatchLoading}
        />
      );
    }

    return <Redirect to={{ pathname: Page.Home, search }} />;
  };

  return (
    <>
      {loading && !tournament ? (
        <Spinner />
      ) : (
        <>
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
