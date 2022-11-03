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

  return (
    <Box
      pt={2}
      sx={{
        position: 'sticky',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        display: 'grid',
        top: 0
      }}
    >
      {amParticipant && (
        <Box mt={0.5}>
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <TournamentStatusChip
              label={`${
                tournament.status === TournamentStatus.Active
                  ? 'Playing'
                  : 'Played'
              }`}
            />
            {tournament.status === TournamentStatus.Active && (
              <>
                <SwapViewButton
                  tournamentId={tournament._id}
                  isTournamentPage={
                    page.includes('view') && !page.includes('match')
                  }
                />
                <LeaveTournamentButton tournamentId={tournament._id} />
              </>
            )}
          </Box>
          <Box mt={0.5}>
            <Divider />
          </Box>
        </Box>
      )}

      <Box px={2} mb={0.5}>
        <Typography className={classes.noWrap} variant={'h5'}>
          {tournament.name}
        </Typography>

        <Box display={'flex'} alignItems={'center'} className={classes.noWrap}>
          {currentRound > 0 && (
            <Box mr={1}>
              <Typography variant={'h6'}>{`Round ${currentRound}`}</Typography>
            </Box>
          )}

          <Box display={'flex'} className={classes.noWrap}>
            <Typography variant={'subtitle2'} className={classes.noWrap}>
              {`${playerCount} player${
                playerCount !== 1 ? 's' : ''
              } ${totalRounds} rounds`}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider />
    </Box>
  );
};

export default TournamentHeader;
