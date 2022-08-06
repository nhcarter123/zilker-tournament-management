import React, { useContext } from 'react';
import moment from 'moment';

import { Box, capitalize, Card, IconButton, Typography } from '@mui/material/';
import Bold from 'components/Bold';
import JoinTournamentButton from 'components/buttons/JoinTournamentButton';
import AddTournamentButton from 'components/buttons/AddTournamentButton';
import TournamentStatusChip from 'components/pages/AppPage/TournamentPage/TournamentStatusChip';
import ImageWithBackup from 'components/ImageWithBackup';

import LocationOnIcon from '@mui/icons-material/LocationOn';

import { TournamentStatus, TournamentWithOrganization } from 'types/types';
import { UserContext } from 'context/userContext';
import { Page } from 'types/page';
import { useHistory } from 'react-router-dom';

interface JoinTournamentListProps {
  tournaments: TournamentWithOrganization[];
}

const JoinTournamentList = ({
  tournaments
}: JoinTournamentListProps): JSX.Element => {
  const history = useHistory();
  const me = useContext(UserContext);

  const inNoneOfTheseTournaments = !tournaments.some(
    (tournament) =>
      tournament.players.includes(me?._id || '') &&
      tournament.status === TournamentStatus.Active
  );

  return (
    <Box sx={{ position: 'relative', height: '100%' }} mx={1}>
      <Box
        sx={{
          overflow: 'auto',
          borderColor: '#e5e5e5',
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        }}
        p={1}
      >
        {me?.organizationId && <AddTournamentButton />}

        {tournaments.map((tournament, index) => {
          const amParticipant = tournament.players.includes(me?._id || '');

          return (
            <Card
              key={index}
              sx={{
                marginBottom: `${
                  index !== tournaments.length - 1 ? '16px' : '32px'
                }`,
                boxShadow: 'rgb(149 149 149) 0px 2px 4px 0px',
                position: 'relative'
              }}
              onClick={(): void =>
                history.push(
                  Page.ViewTournament.replace(':tournamentId', tournament._id) +
                    history.location.search
                )
              }
            >
              <ImageWithBackup image={tournament.photo}>
                <Box sx={{ position: 'absolute', right: 0, top: 0 }} p={1}>
                  {amParticipant && (
                    <TournamentStatusChip
                      label={`${
                        tournament.status === TournamentStatus.Active
                          ? 'Playing'
                          : 'Played'
                      }`}
                    />
                  )}
                  {tournament.status !== TournamentStatus.Created && (
                    <TournamentStatusChip
                      label={capitalize(tournament.status)}
                      background={'#1890ff'}
                    />
                  )}
                </Box>
              </ImageWithBackup>
              <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-between'}
                px={0.5}
                py={1}
                sx={{
                  background: '#d4fbcd',
                  padding: '4px 8px'
                }}
              >
                <Box>
                  <Typography variant={'body1'} component={'span'}>
                    <Bold>{tournament.name}</Bold>
                  </Typography>

                  <Typography variant={'body2'}>
                    {`${moment(tournament.date).format('ll')} - ${
                      tournament.organization?.name
                    }`}
                  </Typography>

                  <Box>
                    <Typography variant={'subtitle2'}>
                      {tournament.standings.length} player
                      {tournament.standings.length === 1 ? '' : 's'}
                    </Typography>
                  </Box>
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
