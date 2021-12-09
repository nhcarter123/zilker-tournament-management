import React from 'react';
import moment from 'moment';

import { Box, Divider, Typography } from '@mui/material/';
import JoinTournamentButton from 'components/buttons/JoinTournamentButton';

import { Tournament } from 'types/types';
import { useQuery } from '@apollo/client';
import { GET_UPCOMING_TOURNAMENTS } from '../../../../../graphql/queries/queries';
import Spinner from '../../../../Spinner';
import Bold from '../../../../Bold';

interface JoinPageProps {
  tournament: Nullable<Tournament>;
}

const JoinPage = ({ tournament }: JoinPageProps): JSX.Element => {
  const { data: tournamentData, loading } = useQuery<{
    getUpcomingTournaments: Tournament[];
  }>(GET_UPCOMING_TOURNAMENTS, {
    skip: Boolean(tournament)
  });

  const upcomingTournaments = tournamentData?.getUpcomingTournaments || [];

  // todo split this into smaller pieces

  return (
    <div>
      {tournament ? (
        <>
          <Typography variant={'h4'} align={'center'}>
            {tournament.name}
          </Typography>
          <Typography variant={'subtitle2'} align={'center'}>
            {moment(tournament.date).format('LL')}
          </Typography>
          <Typography variant={'subtitle2'} align={'center'}>
            {`${tournament.players.length} player${
              tournament.players.length !== 1 ? 's' : ''
            } have joined so far`}
          </Typography>
          <JoinTournamentButton tournamentId={tournament._id} />
        </>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default JoinPage;
