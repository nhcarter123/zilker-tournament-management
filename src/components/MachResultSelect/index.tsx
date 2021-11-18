import React from 'react';

import { Box, Typography } from '@mui/material';
import { Radio, RadioChangeEvent } from 'antd';
import Spinner from 'components/Spinner';

import { useMutation } from '@apollo/client';
import { UPDATE_MATCH } from 'graphql/mutations/mutations';
import { GET_MY_MATCH } from 'graphql/queries/queries';
import { onError } from 'graphql/errorHandler';

import { useStyles } from 'components/MachResultSelect/styles';
import { Match, MatchResult } from 'types/types';

const winLossOptions = [
  { label: 'White won', value: MatchResult.WhiteWon },
  { label: 'Black won', value: MatchResult.BlackWon }
];

const drawDnsOptions = [
  { label: 'Draw', value: MatchResult.Draw },
  { label: 'Did not start', value: MatchResult.DidNotStart }
];

interface MatchResultSelectProps {
  match: Match;
}

const MatchResultSelect = ({ match }: MatchResultSelectProps): JSX.Element => {
  const classes = useStyles();

  const [updateMatch, { loading }] = useMutation(UPDATE_MATCH, {
    refetchQueries: [GET_MY_MATCH],
    onError
  });

  const onChange = (e: RadioChangeEvent): void => {
    updateMatch({
      variables: { matchId: match._id, payload: { result: e.target.value } }
    });
  };

  return (
    <Box mt={3}>
      <Box mb={1}>
        <Typography variant={'h5'} align={'center'}>
          Match result
        </Typography>
      </Box>

      <div className={classes.container}>
        {loading ? (
          <Box mt={1}>
            <Spinner linear />
          </Box>
        ) : (
          <>
            <Radio.Group
              options={winLossOptions}
              onChange={onChange}
              value={match.result}
              optionType={'button'}
              buttonStyle={'solid'}
              size={'large'}
            />
            <Box>
              <Radio.Group
                className={classes.wideDraw}
                options={drawDnsOptions}
                onChange={onChange}
                value={match.result}
                optionType={'button'}
                buttonStyle={'solid'}
                size={'large'}
              />
            </Box>
          </>
        )}
      </div>
    </Box>
  );
};

export default MatchResultSelect;
