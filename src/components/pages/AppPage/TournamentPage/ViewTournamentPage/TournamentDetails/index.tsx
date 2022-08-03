import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { debounce } from 'lodash';

import { Box, FormGroup, Slider, TextField, Typography } from '@mui/material/';
import { LocalizationProvider, MobileDatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import { UPDATE_TOURNAMENT } from 'graphql/definitions/mutations';
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

const performanceWeightMarks = [
  {
    value: 0,
    label: 'Off'
  },
  {
    value: 1,
    label: 'Low'
  },
  {
    value: 2,
    label: 'Medium'
  },
  {
    value: 3,
    label: 'High'
  }
];

const maxPunchDownMarks = [
  {
    value: 0,
    label: 'Off'
  },
  {
    value: 1,
    label: '16'
  },
  {
    value: 2,
    label: '8'
  },
  {
    value: 3,
    label: '4'
  },
  {
    value: 4,
    label: '2'
  }
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

  const handlePerformanceWeightSliderChange = (
    _: Event,
    value: number | number[]
  ) =>
    updateTournament({
      variables: {
        tournamentId: tournament._id,
        payload: {
          config: {
            totalRounds: tournament.config.totalRounds,
            maxPunchDown: tournament.config.maxPunchDown,
            performanceWeight: Array.isArray(value) ? value[0] || 0 : value
          }
        }
      }
    });

  const handleMaxPunchDownSliderChange = (_: Event, value: number | number[]) =>
    updateTournament({
      variables: {
        tournamentId: tournament._id,
        payload: {
          config: {
            totalRounds: tournament.config.totalRounds,
            performanceWeight: tournament.config.performanceWeight,
            maxPunchDown: Array.isArray(value) ? value[0] || 0 : value
          }
        }
      }
    });

  return (
    <>
      <Typography variant={'h5'} align={'center'} mt={2}>
        Details
      </Typography>

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

      <FormGroup>
        <Box mt={2}>
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

        <Box mt={2}>
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

        {tournament.pairingAlgorithm === PairingAlgorithm.Rating && (
          <Box>
            <Typography variant={'body2'} mt={2} mb={-1}>
              Performance weight
            </Typography>
            <Box px={1}>
              <Slider
                key={`performanceWeight-${tournament.config.performanceWeight}`}
                defaultValue={tournament.config.performanceWeight}
                valueLabelDisplay="off"
                onChange={debounce(handlePerformanceWeightSliderChange, 500)}
                marks={performanceWeightMarks}
                min={0}
                max={3}
                step={1}
              />
            </Box>

            <Typography variant={'body2'} mt={1} mb={2}>
              The performance weight setting controls in impact ofmatch
              performance on future tournament pairings.
            </Typography>
          </Box>
        )}

        {tournament.pairingAlgorithm === PairingAlgorithm.Swiss && (
          <Box>
            <Typography variant={'body2'} mt={2} mb={-1}>
              Max punch-down
            </Typography>
            <Box px={1}>
              <Slider
                key={`maxPunchDown-${tournament.config.maxPunchDown}`}
                defaultValue={tournament.config.maxPunchDown}
                valueLabelDisplay="off"
                onChange={debounce(handleMaxPunchDownSliderChange, 500)}
                marks={maxPunchDownMarks}
                min={0}
                max={4}
                step={1}
              />
            </Box>

            <Typography variant={'body2'} mt={1} mb={2}>
              The max punch-down setting subdivides swiss pools into small
              sections. A value of 8 means that the 1st seed will play the 8th
              seed in the first round for example.
            </Typography>
          </Box>
        )}
      </FormGroup>
    </>
  );
};

export default TournamentDetails;
