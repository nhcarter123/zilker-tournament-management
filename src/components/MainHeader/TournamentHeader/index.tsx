import React, { useContext } from 'react';
import { findIndex } from 'lodash';
import { matchPath, useLocation } from 'react-router-dom';

import LeaveTournamentButton from 'components/pages/AppPage/TournamentPage/LeaveTournamentButton';
import SwapViewButton from 'components/pages/AppPage/TournamentPage/SwapViewButton';
import TournamentStatusChip from 'components/pages/AppPage/TournamentPage/TournamentStatusChip';
import { Box, Typography, Divider } from '@mui/material';

import { useStyles } from 'components/MainHeader/TournamentHeader/styles';
import { UserContext } from 'context/userContext';
import { Page } from 'types/page';
import { Tournament, TournamentStatus } from 'types/types';
import { getUserAllUserIdsFromTournament } from 'helpers/helpers';
import { THEME_PRIMARY } from 'constants/constants';

interface TournamentHeaderProps {
  tournament: Nullable<Tournament>;
}

const TournamentHeader = ({
  tournament
}: TournamentHeaderProps): JSX.Element => {
  const me = useContext(UserContext);
  const page = useLocation().pathname;
  const classes = useStyles();
  const pathMatch = matchPath<{ matchId?: string }>(page, {
    path: Page.ViewTournamentMatch,
    exact: false,
    strict: false
  });

  const idFromRoute = pathMatch?.params.matchId;
  const amParticipant = tournament?.players.includes(me?._id || '');

  if (!tournament) {
    return <Box sx={{ height: '64px' }} />;
  }

  // Show round number from matchId if it is present
  const matchRound =
    findIndex(tournament.rounds, (round) =>
      round.matches.includes(idFromRoute || '')
    ) + 1;

  const currentRound = matchRound || tournament.rounds.length;
  const totalRounds = tournament.config.totalRounds;

  const playerCount = getUserAllUserIdsFromTournament(tournament).length;

  const isTournamentPage = page.includes('view') && !page.includes('match');

  return (
    <Box
      bgcolor={THEME_PRIMARY}
      pt={2}
      sx={{
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        display: 'grid'
      }}
    >
      <Box px={2}>
        <Typography color={'#fff'} className={classes.noWrap} variant={'h5'}>
          {tournament.name}
        </Typography>

        <Box display={'flex'} alignItems={'center'} className={classes.noWrap}>
          {currentRound > 0 && (
            <Box mr={1}>
              <Typography
                color={'#fff'}
                variant={'h6'}
              >{`Round ${currentRound}`}</Typography>
            </Box>
          )}

          <Box display={'flex'} className={classes.noWrap}>
            <Typography
              color={'#fff'}
              variant={'subtitle2'}
              className={classes.noWrap}
            >
              {`${playerCount} player${
                playerCount !== 1 ? 's' : ''
              } ${totalRounds} rounds`}
            </Typography>
          </Box>
        </Box>
      </Box>

      {amParticipant && (
        <Box>
          <Divider sx={{ background: '#fff' }} />

          <Box
            my={0.5}
            display={'grid'}
            alignItems={'center'}
            gridTemplateColumns={'1fr 1fr 1fr'}
          >
            <TournamentStatusChip
              label={`${
                tournament.status === TournamentStatus.Active
                  ? 'Playing'
                  : 'Played'
              }`}
            />

            {!isTournamentPage ||
            tournament.status === TournamentStatus.Active ? (
              <SwapViewButton
                tournamentId={tournament._id}
                isTournamentPage={isTournamentPage}
              />
            ) : (
              <Box />
            )}

            {tournament.status === TournamentStatus.Active ? (
              <LeaveTournamentButton tournamentId={tournament._id} />
            ) : (
              <Box />
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default TournamentHeader;
