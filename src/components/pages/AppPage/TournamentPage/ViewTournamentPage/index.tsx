import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import { Box, Typography } from '@mui/material/';
import Spinner from 'components/Spinner';
import TournamentRounds from 'components/pages/AppPage/TournamentPage/ViewTournamentPage/TournamentRounds';
import TournamentPlayers from 'components/pages/AppPage/TournamentPage/ViewTournamentPage/TournamentPlayers';
import TournamentDetails from 'components/pages/AppPage/TournamentPage/ViewTournamentPage/TournamentDetails';

import { GET_USERS } from 'graphql/definitions/queries';
import { Role, Tournament, User } from 'types/types';
import { UserContext } from 'context/userContext';
import { getUserAllUserIdsFromTournament } from 'helpers/helpers';

interface ViewTournamentPageProps {
  tournament: Nullable<Tournament>;
}

const ViewTournamentPage = ({
  tournament
}: ViewTournamentPageProps): JSX.Element => {
  const [selectedRound, setSelectedRound] = useState<Nullable<string>>(null);
  const me = useContext(UserContext);

  const userIds = tournament ? getUserAllUserIdsFromTournament(tournament) : [];

  useEffect(() => {
    if (tournament?.rounds.length) {
      setSelectedRound(
        tournament.rounds[tournament.rounds.length - 1]?._id || ''
      );
    }
  }, [tournament]);

  // todo possibly put this in tournament rounds, although its here for now to show loading state at this level
  const { data: usersData, loading } = useQuery<{
    getUsers: Nullable<User[]>;
  }>(GET_USERS, { variables: { userIds }, fetchPolicy: 'cache-and-network' });

  const users = usersData?.getUsers;

  // todo
  // footer?
  return (
    <Box sx={{ position: 'relative', height: '100%', width: '100%' }} mx={1}>
      {loading && !users ? (
        <Spinner />
      ) : (
        tournament &&
        users && (
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
          >
            <Box
              sx={{ height: 'fit-content', maxWidth: '400px', width: '100%' }}
              px={1}
              mx={'auto'}
            >
              {(me?.organizationId === tournament.organizationId ||
                me?.role === Role.Admin) && (
                <TournamentDetails tournament={tournament} />
              )}
              {tournament.rounds.length > 0 && (
                <TournamentRounds
                  tournament={tournament}
                  selectedRound={selectedRound}
                  setSelectedRound={setSelectedRound}
                />
              )}
              {tournament.players.length > 0 ? (
                <Box>
                  <TournamentPlayers users={users} tournament={tournament} />
                  <Box mt={6}>ㅤ</Box> {/*// give some space at the bottom*/}
                </Box>
              ) : (
                <Box mt={2}>
                  <Typography>
                    Waiting for players to join... It&apos;s too quiet in here
                    👀
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        )
      )}
    </Box>
  );
};

export default ViewTournamentPage;
