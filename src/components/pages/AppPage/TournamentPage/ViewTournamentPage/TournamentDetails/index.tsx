import React, { ChangeEvent } from 'react';
import { useMutation } from '@apollo/client';
import { debounce } from 'lodash';

import { Box, Divider, Slider, TextField, Typography } from '@mui/material/';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { UPDATE_TOURNAMENT } from 'graphql/definitions/mutations';
import { PairingAlgorithm, Tournament, TournamentStatus } from 'types/types';
import { onError } from 'graphql/errorHandler';
import Input from 'antd/lib/input';
import { Radio } from 'antd';
import { useStyles } from 'components/pages/AppPage/TournamentPage/ViewTournamentPage/TournamentDetails/styles';
import TournamentPictureEditor from 'components/TournamentPictureEditor';

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

const skillGroupCountMarks = [
  {
    value: 1,
    label: '1'
  },
  {
    value: 2,
    label: '2'
  },
  {
    value: 3,
    label: '3'
  }
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
  const [updateTournament] = useMutation(UPDATE_TOURNAMENT, {
    onError
  });

  // todo maybe rewrite this as form?

  const handleTournamentNameChange = (e: ChangeEvent<HTMLInputElement>) =>
    updateTournament({
      variables: {
        tournamentId: tournament._id,
        payload: { name: e.target.value }
      }
    });

  // TODO: rethink this
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
            skillGroupCount: tournament.config.skillGroupCount,
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
            skillGroupCount: tournament.config.skillGroupCount,
            maxPunchDown: Array.isArray(value) ? value[0] || 0 : value
          }
        }
      }
    });

  const handleSkillGroupCountSliderChange = (
    _: Event,
    value: number | number[]
  ) =>
    updateTournament({
      variables: {
        tournamentId: tournament._id,
        payload: {
          config: {
            totalRounds: tournament.config.totalRounds,
            performanceWeight: tournament.config.performanceWeight,
            maxPunchDown: tournament.config.maxPunchDown,
            skillGroupCount: Array.isArray(value) ? value[0] || 0 : value
          }
        }
      }
    });

  return (
    <>
      <Typography variant={'h5'} align={'center'} mt={2}>
        Details
      </Typography>

      <TournamentPictureEditor tournament={tournament} />

      <Box mt={1}>
        <Input
          defaultValue={tournament.name}
          onChange={debounce(handleTournamentNameChange, 1000)}
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

      <Box mt={2}>
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
          <Box px={2}>
            <Slider
              key={`performanceWeight-${tournament.config.performanceWeight}`}
              className={classes.disableSliderBackground}
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
          <Box px={2}>
            <Slider
              key={`maxPunchDown-${tournament.config.maxPunchDown}`}
              className={classes.disableSliderBackground}
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

      <Box>
        <Typography variant={'body2'} mt={2} mb={-1}>
          Skill group count
        </Typography>
        <Box px={2}>
          <Slider
            key={`skillGroupCount-${tournament.config.skillGroupCount}`}
            className={classes.disableSliderBackground}
            defaultValue={tournament.config.skillGroupCount}
            onChange={debounce(handleSkillGroupCountSliderChange, 500)}
            marks={skillGroupCountMarks}
            min={1}
            max={3}
            step={1}
          />
        </Box>
      </Box>

      <Box mb={3}>
        <Divider />
      </Box>
    </>
  );
};

export default TournamentDetails;
