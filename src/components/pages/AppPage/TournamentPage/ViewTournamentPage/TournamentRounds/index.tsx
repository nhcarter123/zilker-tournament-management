import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import { useMutation } from '@apollo/client';

import { Button, Popconfirm } from 'antd';
import { Box, Checkbox, Divider, Typography } from '@mui/material/';
import RoundListItem from 'components/RoundListItem';

import { NEXT_ROUND } from 'graphql/mutations/mutations';
import { Role, Tournament, TournamentStatus } from 'types/types';
import { onError } from 'graphql/errorHandler';
import { UserContext } from 'context/userContext';

interface TournamentRoundsProps {
  tournament: Tournament;
  selectedRound: Nullable<string>;
  setSelectedRound: Dispatch<SetStateAction<Nullable<string>>>;
}

const TournamentRounds = ({
  tournament,
  selectedRound,
  setSelectedRound
}: TournamentRoundsProps): JSX.Element => {
  const [sendAlert, setSendAlert] = useState(false);
  const me = useContext(UserContext);
  const [isMutationNewRound, setIsMutationNewRound] = useState<boolean>(true);

  const [completeRound, { loading: nextRoundLoading }] = useMutation(
    NEXT_ROUND,
    {
      onError
    }
  );

  return (
    <>
      <Typography variant={'h5'} align={'center'} mb={1} mt={2}>
        {`Rounds (${tournament.rounds.length})`}
      </Typography>

      <Box
        sx={{
          '&>:nth-of-type(2n+1)': {
            background: '#f9f9f9'
          }
        }}
      >
        {tournament.rounds.map((roundPreview, index) => (
          <RoundListItem
            key={index}
            selectedRound={selectedRound}
            setSelectedRound={setSelectedRound}
            index={index}
            tournament={tournament}
            roundPreview={roundPreview}
            isLastRound={index === tournament.rounds.length - 1}
          />
        ))}
      </Box>

      {me?.role === Role.Admin && (
        <>
          <Box
            mt={1}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Checkbox
              onChange={(e) => setSendAlert(e.target.checked)}
              value={sendAlert}
            />
            <Typography>Send text alert</Typography>
          </Box>

          <Box mt={1}>
            <Popconfirm
              title="Are you sure?"
              placement={'top'}
              onConfirm={(): void => {
                setIsMutationNewRound(true);
                completeRound({
                  variables: {
                    tournamentId: tournament._id,
                    newRound: true,
                    textAlert: sendAlert
                  }
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
                setIsMutationNewRound(false);
                completeRound({
                  variables: {
                    tournamentId: tournament._id,
                    newRound: false,
                    textAlert: false
                  }
                });
              }}
            >
              <Button
                disabled={tournament.status === TournamentStatus.Completed}
                size={'large'}
                type="primary"
                loading={!isMutationNewRound && nextRoundLoading}
                block
              >
                Complete tournament
              </Button>
            </Popconfirm>
          </Box>

          <Divider />
        </>
      )}
    </>
  );
};

export default TournamentRounds;
