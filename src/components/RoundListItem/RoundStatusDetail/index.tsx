import React from 'react';

import { find } from 'lodash';
import { useQuery } from '@apollo/client';
import { GET_ROUND } from 'graphql/queries/queries';
import { Box, IconButton, Typography } from '@mui/material';
import Spinner from 'components/Spinner';
import {
  Match,
  MatchResult,
  Round,
  RoundPreview,
  Tournament,
  User
} from 'types/types';

import LaunchIcon from '@mui/icons-material/Launch';
import { useHistory } from 'react-router-dom';
import { Page } from '../../../types/page';

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
  const history = useHistory();
  const { data, loading } = useQuery<{
    getRound: Nullable<Round>;
  }>(GET_ROUND, {
    variables: {
      tournamentId: tournament._id,
      roundId: roundPreview._id
    }
  });

  const renderMatches = (match: Match, index: number): JSX.Element => {
    const white = find(users, (user) => user._id === match.white);
    const black = find(users, (user) => user._id === match.black);

    // todo add enum for bye

    return (
      <Box key={index} display={'flex'} justifyContent={'space-between'}>
        <Box display={'flex'} alignItems={'center'}>
          {match.result === MatchResult.WhiteWon && (
            <Typography ml={1} mr={1} variant={'subtitle1'}>
              👑
            </Typography>
          )}

          <Typography ml={0.5}>
            {match.white === 'bye'
              ? 'Bye'
              : `${white?.firstName} ${white?.lastName}`}
          </Typography>

          {match.result === MatchResult.Draw ? (
            <Typography ml={1} mr={1} variant={'subtitle1'}>
              🤝
            </Typography>
          ) : (
            <Typography
              ml={1}
              mr={1}
              sx={{ fontWeight: '600' }}
              variant={'subtitle1'}
            >
              VS
            </Typography>
          )}

          {match.result === MatchResult.BlackWon && (
            <Typography ml={1} mr={1} variant={'subtitle1'}>
              👑
            </Typography>
          )}

          <Typography>
            {match.black === 'bye'
              ? 'Bye'
              : `${black?.firstName} ${black?.lastName}`}
          </Typography>
        </Box>

        <IconButton
          aria-label="view"
          color={'info'}
          onClick={() =>
            history.push(Page.EditMatch.replace(':matchId', match._id))
          }
        >
          <LaunchIcon />
        </IconButton>
      </Box>
    );
  };

  const sortedMatches = [...(data?.getRound?.matches || [])].sort(
    (a, b) => a.boardNumber - b.boardNumber
  );

  return loading ? (
    <Box sx={{ width: '200px' }} mb={3}>
      <Spinner linear />
    </Box>
  ) : (
    <Box mb={2}>
      <Typography variant={'h6'}>{`${
        data?.getRound?.matches.filter(isComplete).length
      }/${data?.getRound?.matches.length} completed`}</Typography>

      {sortedMatches.map((match, index) => renderMatches(match, index))}
    </Box>
  );
};

export default RoundStatusDetail;
