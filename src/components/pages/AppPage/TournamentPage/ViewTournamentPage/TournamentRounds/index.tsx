import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import { useMutation } from '@apollo/client';

import { Button, Popconfirm } from 'antd';
import { Box, Checkbox, Divider, Typography } from '@mui/material/';
import RoundListItem from 'components/RoundListItem';

import { NEXT_ROUND } from 'graphql/definitions/mutations';
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

  const createRoundButtonDisabled =
    tournament.status === TournamentStatus.Completed ||
    !tournament.players.length;

  const isLastRound =
    tournament.config.totalRounds === tournament.rounds.length;

  return (
    <>
      {tournament.rounds.length ? (
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
        </>
      ) : (
        <></>
      )}

      {(me?.organizationId === tournament.organizationId ||
        me?.role === Role.Admin) && (
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
              disabled={createRoundButtonDisabled || isLastRound}
              onConfirm={(): void => {
                setIsMutationNewRound(true);
                void completeRound({
                  variables: {
                    tournamentId: tournament._id,
                    newRound: true,
                    textAlert: sendAlert
                  }
                });
              }}
            >
              <Button
                disabled={createRoundButtonDisabled || isLastRound}
                size={'large'}
                type="primary"
                loading={isMutationNewRound && nextRoundLoading}
                block
              >
                {tournament.rounds.length === 0
                  ? 'Start first round'
                  : 'Next round'}
              </Button>
            </Popconfirm>
            {isLastRound && (
              <Typography variant={'body2'} mt={1} mb={1}>
                Increase the tournament round count in the settings to create a
                new round`
              </Typography>
            )}
          </Box>

          <Box mt={2}>
            <Popconfirm
              title="Are you sure?"
              placement={'top'}
              disabled={createRoundButtonDisabled || !isLastRound}
              onConfirm={(): void => {
                setIsMutationNewRound(false);
                void completeRound({
                  variables: {
                    tournamentId: tournament._id,
                    newRound: false,
                    textAlert: false
                  }
                });
              }}
            >
              <Button
                disabled={createRoundButtonDisabled || !isLastRound}
                size={'large'}
                type="primary"
                loading={!isMutationNewRound && nextRoundLoading}
                block
              >
                Complete tournament
              </Button>
            </Popconfirm>
          </Box>
          {!isLastRound && (
            <Typography variant={'body2'} mt={1} mb={3}>
              Decrease the round count in the settings if you would like to
              finish early
            </Typography>
          )}
        </>
      )}

      <Box mb={3}>
        <Divider />
      </Box>
    </>
  );
};

export default TournamentRounds;
