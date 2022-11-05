import React, { useContext } from 'react';
import moment from 'moment';

import { Box, Card, IconButton, Typography } from '@mui/material/';
import Bold from 'components/Bold';
import JoinTournamentButton from 'components/buttons/JoinTournamentButton';
import TournamentStatusChip from 'components/pages/AppPage/TournamentPage/TournamentStatusChip';
import AddTournamentButton from 'components/buttons/AddTournamentButton';
import ImageWithBackup from 'components/ImageWithBackup';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useHistory } from 'react-router-dom';
import { TournamentStatus, TournamentWithOrganization } from 'types/types';
import { UserContext } from 'context/userContext';
import { Page } from 'types/page';
import { getUserAllUserIdsFromTournament } from 'helpers/helpers';

interface JoinTournamentListProps {
  status: TournamentStatus;
  tournaments: TournamentWithOrganization[];
}

const JoinTournamentList = ({
  tournaments,
  status
}: JoinTournamentListProps): JSX.Element => {
  const history = useHistory();
  const me = useContext(UserContext);

  const inNoneOfTheseTournaments = !tournaments.some(
    (tournament) =>
      tournament.players.includes(me?._id || '') &&
      tournament.status === TournamentStatus.Active
  );

  return (
    <Box position={'relative'} height={'100%'} mx={1}>
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
        px={1}
      >
        {tournaments.length === 0 ? (
          <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            fontStyle={'italic'}
            height={'100%'}
          >
            <Typography variant="body1">
              There are currently no{' '}
              {status === TournamentStatus.Active
                ? 'active'
                : status === TournamentStatus.Created
                ? 'scheduled'
                : 'completed'}{' '}
              events
            </Typography>
          </Box>
        ) : (
          <Box>
            <Box mt={2} display={'flex'} justifyContent={'center'}>
              {me?.organizationId && status === TournamentStatus.Created && (
                <AddTournamentButton />
              )}
            </Box>
            {tournaments.map((tournament, index) => {
              const amParticipant = tournament.players.includes(me?._id || '');

              const playerCount =
                getUserAllUserIdsFromTournament(tournament).length;

              return (
                <Card
                  key={index}
                  sx={{
                    marginBottom: '16px',
                    boxShadow: 'rgb(149 149 149) 0px 2px 4px 0px',
                    position: 'relative'
                  }}
                  onClick={(): void =>
                    history.push(
                      Page.ViewTournament.replace(
                        ':tournamentId',
                        tournament._id
                      ) + history.location.search
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
                          {playerCount} player
                          {playerCount === 1 ? '' : 's'}
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
                        <JoinTournamentButton
                          tournamentId={tournament._id}
                          organizationId={tournament.organizationId}
                        />
                      )}
                  </Box>
                </Card>
              );
            })}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default JoinTournamentList;
