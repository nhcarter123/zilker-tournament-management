import React, { useContext } from 'react';

import { useSubscription } from '@apollo/client';
import { GET_ROUND } from 'graphql/definitions/queries';
import { Box, IconButton, Typography } from '@mui/material';
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

import LaunchIcon from '@mui/icons-material/Launch';
import { useHistory } from 'react-router-dom';
import { Page } from 'types/page';
import WinnerText from 'components/WinnerText';
import { UserContext } from 'context/userContext';
import Bold from 'components/Bold';
import { MATCH_UPDATED } from 'graphql/definitions/subscriptions';
import { useQueryWithReconnect } from 'hooks/useQueryWithReconnect';

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
  const me = useContext(UserContext);
  const history = useHistory();

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

  const renderMatches = (
    match: MatchWithUserInfo,
    index: number
  ): JSX.Element => {
    const isByeRound = !match.black || !match.white;

    return (
      <Box key={index} display={'flex'} justifyContent={'space-between'} pt={1}>
        <Box display={'flex'} alignItems={'center'}>
          <WinnerText
            variant={'body2'}
            won={match.result === MatchResult.WhiteWon}
            name={`${match.white?.firstName} ${(
              match.white?.lastName || ''
            ).substring(0, 1)}`}
          />

          {match.result === MatchResult.Draw ? (
            <Typography ml={1} mr={1} variant={'subtitle1'}>
              🤝
            </Typography>
          ) : (
            <Typography ml={1} mr={1} variant={'subtitle1'} component={'span'}>
              <Bold>VS</Bold>
            </Typography>
          )}

          <WinnerText
            variant={'body2'}
            won={match.result === MatchResult.BlackWon}
            name={
              match.black
                ? `${match.black?.firstName} ${(
                    match.black?.lastName || ''
                  ).substring(0, 1)}`
                : 'Bye'
            }
          />
        </Box>

        {!isByeRound && me?.organizationId === tournament.organizationId ? (
          <IconButton
            aria-label="view"
            color={'info'}
            onClick={() =>
              history.push(
                Page.ViewMatch.replace(':tournamentId', tournament._id).replace(
                  ':matchId',
                  match._id
                ) + history.location.search
              )
            }
          >
            <LaunchIcon />
          </IconButton>
        ) : (
          <div />
        )}
      </Box>
    );
  };

  const matches = [...(data?.getRound?.matches || [])];

  const sortedMatches = matches.sort((a, b) => a.boardNumber - b.boardNumber);

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

      {sortedMatches.map((match, index) => renderMatches(match, index))}
    </Box>
  );
};

export default RoundStatusDetail;
