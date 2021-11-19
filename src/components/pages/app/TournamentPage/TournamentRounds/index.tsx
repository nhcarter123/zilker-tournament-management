import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { Button, Popconfirm } from 'antd';
import { Box, Typography, Divider } from '@mui/material/';
import RoundListItem from 'components/RoundListItem';

import { GET_TOURNAMENT } from 'graphql/queries/queries';
import { NEXT_ROUND } from 'graphql/mutations/mutations';
import { Tournament, User } from 'types/types';
import { onError } from 'graphql/errorHandler';

interface TournamentRoundsProps {
  users: User[];
  tournament: Tournament;
}

const TournamentRounds = ({
  tournament,
  users
}: TournamentRoundsProps): JSX.Element => {
  const [selectedRound, setSelectedRound] = useState<Nullable<string>>(null);
  const [isMutationNewRound, setIsMutationNewRound] = useState<boolean>(true);

  const [completeRound, { loading: nextRoundLoading }] = useMutation(
    NEXT_ROUND,
    {
      refetchQueries: [GET_TOURNAMENT],
      onError
    }
  );

  return (
    <>
      <Typography variant={'h5'} align={'center'} mb={1} mt={2}>
        Rounds
      </Typography>

      <Divider />

      {tournament.rounds.map((roundPreview, index) => (
        <RoundListItem
          key={index}
          selectedRound={selectedRound}
          setSelectedRound={setSelectedRound}
          index={index}
          tournament={tournament}
          users={users}
          roundPreview={roundPreview}
          isLastRound={index === tournament.rounds.length - 1}
        />
      ))}

      <Box mt={3}>
        <Popconfirm
          title="Are you sure?"
          placement={'top'}
          onConfirm={(): void => {
            setIsMutationNewRound(true);
            completeRound({
              variables: { tournamentId: tournament._id, newRound: true }
            });
          }}
        >
          <Button
            size={'large'}
            type="primary"
            loading={isMutationNewRound && nextRoundLoading}
            block
          >
            New round
          </Button>
        </Popconfirm>
      </Box>

      <Box mt={2} mb={3}>
        <Popconfirm
          title="Are you sure?"
          placement={'top'}
          onConfirm={(): void => {
            setIsMutationNewRound(true);
            completeRound({
              variables: { tournamentId: tournament._id, newRound: false }
            });
          }}
        >
          <Button
            size={'large'}
            type="primary"
            loading={!isMutationNewRound && nextRoundLoading}
            block
          >
            Complete tournament
          </Button>
        </Popconfirm>
      </Box>
    </>
  );
};

export default TournamentRounds;
