import React from 'react';

import { Box, IconButton, Typography } from '@mui/material';
import { MatchResult, MatchWithUserInfo } from 'types/types';

import LaunchIcon from '@mui/icons-material/Launch';
import { useHistory } from 'react-router-dom';
import { Page } from 'types/page';
import WinnerText from 'components/WinnerText';
import Bold from 'components/Bold';

interface IMatchListItemProps {
  match: MatchWithUserInfo;
  tournamentId?: string;
}

const MatchListItem = ({
  match,
  tournamentId
}: IMatchListItemProps): JSX.Element => {
  const history = useHistory();

  const isByeRound = !match.black || !match.white;

  return (
    <Box display={'flex'} justifyContent={'space-between'} pt={1}>
      <Box display={'flex'} alignItems={'baseline'}>
        <WinnerText
          rating={match.whiteRating}
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
          rating={match.blackRating}
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

      {!isByeRound && (
        <IconButton
          aria-label="view"
          color={'info'}
          onClick={() =>
            tournamentId
              ? history.push(
                  Page.ViewTournamentMatch.replace(
                    ':tournamentId',
                    tournamentId
                  ).replace(':matchId', match._id) + history.location.search
                )
              : history.push(
                  Page.ViewSoloMatch.replace(':matchId', match._id) +
                    history.location.search
                )
          }
        >
          <LaunchIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default MatchListItem;
