import React, { useContext } from 'react';
import moment from 'moment';

import { Box, Card, IconButton, Typography } from '@mui/material/';
import Bold from 'components/Bold';
import JoinTournamentButton from 'components/buttons/JoinTournamentButton';
import AddTournamentButton from 'components/buttons/AddTournamentButton';
import TournamentStatusChip from 'components/pages/AppPage/TournamentPage/TournamentStatusChip';

import LocationOnIcon from '@mui/icons-material/LocationOn';

import { Tournament, TournamentStatus } from 'types/types';
import { UserContext } from 'context/userContext';
import { Page } from 'types/page';
import { useHistory } from 'react-router-dom';

interface JoinTournamentListProps {
  label: string;
  tournaments: Tournament[];
  withCreateButton?: boolean;
}

const JoinTournamentList = ({
  label,
  tournaments,
  withCreateButton
}: JoinTournamentListProps): JSX.Element => {
  const history = useHistory();
  const me = useContext(UserContext);

  const inNoneOfTheseTournaments = !tournaments.some((tournament) =>
    tournament.players.includes(me?._id || '')
  );

  return (
    <Box mb={3}>
      <Typography variant={'h6'}>{label}</Typography>
      <Box sx={{ position: 'relative' }}>
        <Box
          sx={{
            position: 'absolute',
            width: '8px',
            height: '30vh',
            background: '#fafafa',
            right: '0px',
            border: '1px solid',
            borderColor: '#eaeaea'
          }}
        />
      </Box>
      <Box
        sx={{
          background: '#f7f7f7',
          height: '30vh',
          overflow: 'auto',
          borderTop: '2px solid',
          borderBottom: '2px solid',
          borderColor: '#e5e5e5'
        }}
        p={1}
      >
        {me?.organizationId && withCreateButton && <AddTournamentButton />}

        {tournaments.map((tournament, index) => {
          const amParticipant = tournament.players.includes(me?._id || '');

          return (
            <Card
              key={index}
              sx={{
                color: 'white',
                background: amParticipant ? '#7a37e9' : '#1890ff',
                padding: '4px 8px',
                marginBottom: `${
                  index !== tournaments.length - 1 ? '8px' : ''
                }`,
                marginRight: '8px'
              }}
              onClick={(): void =>
                history.push(
                  Page.ViewTournament.replace(':tournamentId', tournament._id) +
                    history.location.search
                )
              }
            >
              <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-between'}
              >
                <Box>
                  <Typography variant={'body1'} component={'span'}>
                    <Bold>{tournament.name}</Bold>
                  </Typography>
                  <Typography variant={'body2'}>
                    {moment(tournament.date).format('ll')}
                  </Typography>
                </Box>

                {tournament.location && (
                  <IconButton
                    aria-label="view"
                    color={'info'}
                    onClick={() => window.open(tournament.location)}
                  >
                    <LocationOnIcon />
                  </IconButton>
                )}

                {amParticipant && (
                  <TournamentStatusChip status={tournament.status} />
                )}

                {inNoneOfTheseTournaments &&
                  tournament.status === TournamentStatus.Active && (
                    <JoinTournamentButton tournamentId={tournament._id} />
                  )}
              </Box>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};

export default JoinTournamentList;
