import React, { useContext } from 'react';
import { findIndex } from 'lodash';
import { matchPath, useHistory, useLocation } from 'react-router-dom';

import LeaveTournamentButton from 'components/pages/AppPage/TournamentPage/LeaveTournamentButton';
import { Box, Typography, Divider } from '@mui/material';

import { useStyles } from 'components/MainHeader/TournamentHeader/styles';
import { UserContext } from 'context/userContext';
import { Page } from 'types/page';
import { Tournament, TournamentStatus } from 'types/types';
import { getUserAllUserIdsFromTournament } from 'helpers/helpers';
import { THEME_PRIMARY } from 'constants/constants';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { MyTournamentContext } from 'context/myTournamentContext';

interface TournamentHeaderProps {
  tournament: Nullable<Tournament>;
}

const TournamentHeader = ({
  tournament
}: TournamentHeaderProps): JSX.Element => {
  const me = useContext(UserContext);
  const page = useLocation().pathname;
  const classes = useStyles();
  const history = useHistory();
  const { myTournamentId } = useContext(MyTournamentContext);

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
  const isMyTournamentPage = page.includes(myTournamentId || 'does not match');

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

        <Box
          display={'flex'}
          alignItems={'baseline'}
          className={classes.noWrap}
        >
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

      <Box>
        <Divider sx={{ background: '#fff' }} />

        <Box
          my={0.5}
          display={'grid'}
          alignItems={'center'}
          gridTemplateColumns={'1fr auto 1fr'}
        >
          <Box ml={1}>
            <Box
              color={'#fff'}
              display={'flex'}
              alignItems={'center'}
              onClick={() => {
                const target = isTournamentPage
                  ? Page.Tournaments
                  : Page.ViewTournament.replace(
                      ':tournamentId',
                      tournament._id
                    );

                history.push(target + history.location.search);
              }}
            >
              <ArrowBackIosNewIcon fontSize={'small'} />
              <Typography variant={'body2'} color={'#fff'}>
                {isTournamentPage ? 'Tournaments' : 'Tournament'}
              </Typography>
            </Box>
          </Box>

          {amParticipant && tournament.status === TournamentStatus.Active ? (
            <Box display={'flex'} justifyContent={'center'}>
              <LeaveTournamentButton tournamentId={tournament._id} />
            </Box>
          ) : (
            <Box />
          )}

          {!isMyTournamentPage || (isMyTournamentPage && isTournamentPage) ? (
            <Box mr={1}>
              {myTournamentId && (
                <Box
                  color={'#fff'}
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'end'}
                  onClick={() =>
                    history.push(
                      Page.Tournament.replace(':tournamentId', myTournamentId) +
                        history.location.search
                    )
                  }
                >
                  <Typography
                    lineHeight={'14px'}
                    variant={'body2'}
                    color={'#fff'}
                    mr={0.5}
                    whiteSpace={'nowrap'}
                    width={'min-content'}
                  >
                    {isTournamentPage ? 'My match' : 'My tournament'}
                  </Typography>
                  <ArrowBackIosNewIcon
                    fontSize={'small'}
                    style={{ transform: 'rotate(180deg)' }}
                  />
                </Box>
              )}
            </Box>
          ) : (
            <Box />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default TournamentHeader;
