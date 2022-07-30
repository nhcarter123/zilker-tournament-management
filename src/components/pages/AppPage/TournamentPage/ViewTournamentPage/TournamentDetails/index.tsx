import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { Box, FormGroup, TextField, Typography } from '@mui/material/';
import { LocalizationProvider, MobileDatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import { UPDATE_TOURNAMENT } from 'graphql/mutations/mutations';
import { PairingAlgorithm, Tournament, TournamentStatus } from 'types/types';
import { onError } from 'graphql/errorHandler';
import Input from 'antd/lib/input';
import { Button, Radio } from 'antd';
import { useStyles } from 'components/pages/AppPage/TournamentPage/ViewTournamentPage/TournamentDetails/styles';

interface TournamentDetailsProps {
  tournament: Tournament;
}

const statusOptions = [
  { label: 'Scheduled', value: TournamentStatus.Created },
  { label: 'Active', value: TournamentStatus.Active },
  { label: 'Completed', value: TournamentStatus.Completed, disabled: true }
];

const pairingAlgorithmOptions = [
  { label: 'Swiss', value: PairingAlgorithm.Swiss },
  { label: 'Rating', value: PairingAlgorithm.Rating }
];

const TournamentDetails = ({
  tournament
}: TournamentDetailsProps): JSX.Element => {
  const classes = useStyles();
  const [tournamentName, setTournamentName] = useState<string>(tournament.name);

  const [updateTournament] = useMutation(UPDATE_TOURNAMENT, {
    onError
  });

  // todo maybe rewrite this as form?

  return (
    <>
      <Typography variant={'h5'} align={'center'} mb={1} mt={2}>
        Details
      </Typography>

      <FormGroup>
        <Input.Group>
          <Input
            style={{ width: 'calc(100% - 80px)' }}
            defaultValue={tournament.name}
            onChange={(e) => setTournamentName(e.target.value)}
          />

          <Button
            type="primary"
            style={{ width: '80px' }}
            onClick={() =>
              updateTournament({
                variables: {
                  tournamentId: tournament._id,
                  payload: { name: tournamentName }
                }
              })
            }
          >
            Update
          </Button>
        </Input.Group>

        <Box mt={1}>
          <Radio.Group
            disabled={tournament.status === TournamentStatus.Completed}
            className={classes.root}
            onChange={(e) =>
              updateTournament({
                variables: {
                  tournamentId: tournament._id,
                  payload: { status: e.target.value }
                }
              })
            }
            options={statusOptions}
            value={tournament.status}
            optionType="button"
            buttonStyle="solid"
          />
        </Box>

        <Box mt={1}>
          <Radio.Group
            className={classes.root}
            onChange={(e) =>
              updateTournament({
                variables: {
                  tournamentId: tournament._id,
                  payload: { pairingAlgorithm: e.target.value }
                }
              })
            }
            options={pairingAlgorithmOptions}
            value={tournament.pairingAlgorithm}
            optionType="button"
            buttonStyle="solid"
          />
        </Box>

        <Box mt={2} sx={{ maxWidth: '120px' }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDatePicker
              label="Date"
              inputFormat="MM/dd/yyyy"
              value={tournament.date}
              renderInput={(params) => <TextField {...params} />}
              onChange={(date) =>
                updateTournament({
                  variables: {
                    tournamentId: tournament._id,
                    payload: { date }
                  }
                })
              }
            />
          </LocalizationProvider>
        </Box>
      </FormGroup>
    </>
  );
};

export default TournamentDetails;
