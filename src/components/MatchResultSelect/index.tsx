import React, { ChangeEvent } from 'react';

import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography
} from '@mui/material';
import Spinner from 'components/Spinner';

import { useMutation } from '@apollo/client';
import { UPDATE_MATCH } from 'graphql/mutations/mutations';
import { GET_MATCH } from 'graphql/queries/queries';
import { onError } from 'graphql/errorHandler';

import { useStyles } from 'components/MatchResultSelect/styles';
import { MatchResult, MatchWithUserInfo } from 'types/types';

interface MatchResultSelectProps {
  match: MatchWithUserInfo;
  matchLoading: boolean;
}

const MatchResultSelect = ({
  match,
  matchLoading
}: MatchResultSelectProps): JSX.Element => {
  const classes = useStyles();

  const [updateMatch, { loading }] = useMutation(UPDATE_MATCH, {
    refetchQueries: [GET_MATCH],
    onError
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    updateMatch({
      variables: { matchId: match._id, payload: { result: e.target.value } }
    });
  };

  return (
    <Box mt={2}>
      <Box mb={1}>
        <Typography variant={'h5'} align={'center'}>
          Match result
        </Typography>
      </Box>

      <div>
        {matchLoading || loading ? (
          <Box mt={1}>
            <Spinner linear />
          </Box>
        ) : (
          <>
            <FormControl component="fieldset">
              <RadioGroup
                name="controlled-radio-buttons-group"
                onChange={onChange}
                value={match.result}
                row
              >
                <Box className={classes.container}>
                  <FormControlLabel
                    control={<Radio />}
                    label={`${match.white?.firstName} won`}
                    value={MatchResult.WhiteWon}
                  />
                  <div className={classes.matchColor}>white</div>
                </Box>
                <Box className={classes.container}>
                  <FormControlLabel
                    control={<Radio />}
                    label={`${match.black?.firstName} won`}
                    value={MatchResult.BlackWon}
                  />
                  <div className={classes.matchColor}>black</div>
                </Box>
              </RadioGroup>
              <RadioGroup
                name="controlled-radio-buttons-group"
                onChange={onChange}
                value={match.result}
                row
              >
                <FormControlLabel
                  control={<Radio />}
                  label="Draw"
                  value={MatchResult.Draw}
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Did not start"
                  value={MatchResult.DidNotStart}
                />
              </RadioGroup>
            </FormControl>
          </>
        )}
      </div>
    </Box>
  );
};

export default MatchResultSelect;
