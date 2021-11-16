import React from 'react';

import { useQuery } from '@apollo/client';
import { GET_ROUND } from 'graphql/queries/queries';
import { Typography, Box } from '@mui/material';
import { Tournament, Round, RoundStatus } from 'types/types';
import Spinner from 'components/Spinner';

interface RoundProps {
  tournament: Tournament;
  round: Round;
}

const RoundStatusDetail = ({ tournament, round }: RoundProps): JSX.Element => {
  const { data, loading } = useQuery<{
    getRound: Nullable<RoundStatus>;
  }>(GET_ROUND, {
    variables: {
      tournamentId: tournament._id,
      roundId: round._id
    },
    fetchPolicy: 'network-only'
  });

  if (!data?.getRound) {
    return <></>;
  }

  return loading ? (
    <Box sx={{ width: '100px' }} ml={2}>
      <Spinner linear />
    </Box>
  ) : (
    <Typography
      ml={1}
    >{`${data.getRound.completeCount}/${data.getRound.total} completed`}</Typography>
  );
};

export default RoundStatusDetail;
