import React from 'react';
import moment from 'moment';

import { Box, Divider, Typography } from '@mui/material/';

import { Tournament } from 'types/types';
import { useQuery } from '@apollo/client';
import { GET_UPCOMING_TOURNAMENTS } from 'graphql/queries/queries';
import Spinner from 'components/Spinner';
import Bold from 'components/Bold';

interface JoinPageProps {
  tournament: Nullable<Tournament>;
}

const UpcomingPage = ({ tournament }: JoinPageProps): JSX.Element => {
  const { data: tournamentData, loading } = useQuery<{
    getUpcomingTournaments: Tournament[];
  }>(GET_UPCOMING_TOURNAMENTS, {
    skip: Boolean(tournament)
  });

  const upcomingTournaments = tournamentData?.getUpcomingTournaments || [];

  return (
    <Box my={'auto'}>
      <Typography variant={'h4'} align={'center'}>
        Uh oh
      </Typography>
      <Typography variant={'body1'}>
        It looks like there aren’t any active tournaments right now. 😢
      </Typography>

      <Box py={2}>
        <Divider />
      </Box>

      <Typography variant={'body1'}>
        Here is a list of upcoming tournaments:
      </Typography>

      <Box mt={1}>
        {loading ? (
          <Spinner linear />
        ) : (
          upcomingTournaments.map((tournament, index) => (
            <Box
              key={index}
              display={'flex'}
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              <Typography variant={'body1'} component={'span'}>
                <Bold>{tournament.name}</Bold>
              </Typography>
              <Typography variant={'body1'}>
                {moment(tournament.date).format('ll')}
              </Typography>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};

export default UpcomingPage;
