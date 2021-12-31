import React, { useContext } from 'react';
import { findIndex } from 'lodash';
import { matchPath, useLocation } from 'react-router-dom';

import LeaveTournamentButton from 'components/pages/AppPage/TournamentPage/LeaveTournamentButton';
import { Box, Typography } from '@mui/material';

import { useStyles } from 'components/MainHeader/TournamentHeader/styles';
import { UserContext } from 'context/userContext';
import { Page } from 'types/page';
import { Tournament, TournamentStatus } from 'types/types';
import { Divider } from '@mui/material/';
import TournamentStatusChip from '../../pages/AppPage/TournamentPage/TournamentStatusChip';

interface TournamentHeaderProps {
  tournament: Nullable<Tournament>;
}

const TournamentHeader = ({
  tournament
}: TournamentHeaderProps): JSX.Element => {
  const me = useContext(UserContext);
  const classes = useStyles();
  const page = useLocation().pathname;
  const pathMatch = matchPath<{ matchId?: string }>(page, {
    path: Page.ViewMatch,
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
  const totalRounds = tournament.totalRounds;

  return (
    <>
      {amParticipant && (
        <Box mt={-0.5}>
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <TournamentStatusChip status={tournament.status} />
            {tournament.status === TournamentStatus.Active && (
              <LeaveTournamentButton tournamentId={tournament._id} />
            )}
          </Box>
          <Box mt={0.5}>
            <Divider />
          </Box>
        </Box>
      )}

      <Box className={classes.root}>
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
              {`${tournament.players.length} player${
                tournament.players.length !== 1 ? 's' : ''
              } ${totalRounds} rounds`}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default TournamentHeader;
