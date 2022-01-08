import React, { useContext } from 'react';

import { find } from 'lodash';
import { useSubscription } from '@apollo/client';
import { GET_ROUND } from 'graphql/queries/queries';
import { Box, IconButton, Typography } from '@mui/material';
import Spinner from 'components/Spinner';
import {
  Match,
  MatchResult,
  MatchWithUserInfo,
  Role,
  Round,
  RoundPreview,
  Tournament,
  User
} from 'types/types';

import LaunchIcon from '@mui/icons-material/Launch';
import { useHistory } from 'react-router-dom';
import { Page } from 'types/page';
import WinnerText from 'components/WinnerText';
import { UserContext } from 'context/userContext';
import Bold from '../../Bold';
import { MATCH_UPDATED } from '../../../graphql/subscriptions/subscriptions';
import { useQueryWithReconnect } from '../../../hooks/useQueryWithReconnect';

interface GetRoundArgs {
  tournamentId: string;
  roundId: string;
}

interface RoundProps {
  tournament: Tournament;
  users: User[];
  roundPreview: RoundPreview;
}

const isComplete = (match: Match): boolean =>
  match.result !== MatchResult.DidNotStart ||
  match.white === 'bye' ||
  match.black === 'bye';

const RoundStatusDetail = ({
  tournament,
  roundPreview,
  users
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
    }
    // fetchPolicy: 'cache-and-network'
  });

  // todo investigate this more
  const { data: updatedMatchData } = useSubscription<{
    matchUpdated: Nullable<MatchWithUserInfo>;
  }>(MATCH_UPDATED, {
    variables: { matchIds: roundPreview.matches }
  });

  const renderMatches = (match: Match, index: number): JSX.Element => {
    const white = find(users, (user) => user._id === match.white);
    const black = find(users, (user) => user._id === match.black);

    // todo add enum for bye
    const isByeRound = match.black === 'bye' || match.white === 'bye';

    return (
      <Box key={index} display={'flex'} justifyContent={'space-between'} pt={1}>
        <Box display={'flex'} alignItems={'center'}>
          <WinnerText
            won={match.result === MatchResult.WhiteWon}
            name={`${white?.firstName} ${(white?.lastName || '').substring(
              0,
              1
            )}`}
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
            won={match.result === MatchResult.BlackWon}
            name={
              match.black === 'bye'
                ? 'Bye'
                : `${black?.firstName} ${(black?.lastName || '').substring(
                    0,
                    1
                  )}`
            }
          />
        </Box>

        {!isByeRound && me?.role === Role.Admin ? (
          <IconButton
            aria-label="view"
            color={'info'}
            onClick={() =>
              history.push(
                Page.ViewMatch.replace(':tournamentId', tournament._id).replace(
                  ':matchId',
                  match._id
                )
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

  let matches = [...(data?.getRound?.matches || [])];

  if (updatedMatchData) {
    matches = matches.map((match) => {
      if (match._id === updatedMatchData.matchUpdated?._id) {
        return {
          ...match,
          ...{
            ...updatedMatchData.matchUpdated,
            white: updatedMatchData.matchUpdated.white?._id || '',
            black: updatedMatchData.matchUpdated.black?._id || ''
          }
        };
      } else {
        return match;
      }
    });
  }

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
