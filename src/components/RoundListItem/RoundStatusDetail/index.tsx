import React from 'react';

import { useSubscription } from '@apollo/client';
import { GET_ROUND } from 'graphql/definitions/queries';
import { Box, Typography } from '@mui/material';
import Spinner from 'components/Spinner';
import {
  MatchResult,
  MatchUpdatedData,
  MatchUpdatedVariables,
  MatchWithUserInfo,
  Round,
  RoundPreview,
  Tournament
} from 'types/types';

import Bold from 'components/Bold';
import { MATCH_UPDATED } from 'graphql/definitions/subscriptions';
import { useQueryWithReconnect } from 'hooks/useQueryWithReconnect';
import MatchListItem from 'components/RoundListItem/MatchListItem';

interface GetRoundArgs {
  tournamentId: string;
  roundId: string;
}

interface RoundProps {
  tournament: Tournament;
  roundPreview: RoundPreview;
}

const isComplete = (match: MatchWithUserInfo): boolean =>
  match.result !== MatchResult.DidNotStart || !match.white || !match.black;

const RoundStatusDetail = ({
  tournament,
  roundPreview
}: RoundProps): JSX.Element => {
  const { data, loading } = useQueryWithReconnect<
    {
      getRound: Nullable<Round>;
    },
    GetRoundArgs
  >(GET_ROUND, {
    variables: {
      tournamentId: tournament._id,
      roundId: roundPreview._id
    },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first'
  });

  useSubscription<MatchUpdatedData, MatchUpdatedVariables>(MATCH_UPDATED, {
    variables: { matchIds: roundPreview.matches }
  });

  const matches = [...(data?.getRound?.matches || [])];

  const sortedMatches = matches.sort(
    (a, b) => (a.boardNumber || 0) - (b.boardNumber || 0)
  );

  return loading && !sortedMatches.length ? (
    <Box sx={{ width: '200px' }} mb={3}>
      <Spinner linear />
    </Box>
  ) : (
    <Box mb={2}>
      <Typography variant={'body1'} component={'span'} color={'gray'}>
        <Bold>{`${matches.filter(isComplete).length}/${
          matches.length
        } completed`}</Bold>
      </Typography>

      {sortedMatches.map((match, index) => (
        <MatchListItem
          tournamentId={tournament._id}
          match={match}
          key={index}
        />
      ))}
    </Box>
  );
};

export default RoundStatusDetail;
