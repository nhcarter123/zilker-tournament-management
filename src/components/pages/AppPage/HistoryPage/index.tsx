import React, { useContext } from 'react';
import { Box, Divider, Link, Typography } from '@mui/material/';
import { IHistoryResult, MatchResult, MatchWithUserInfo } from 'types/types';
import { useQuery } from '@apollo/client';
import { GET_MY_MATCH_HISTORY } from 'graphql/definitions/queries';
import Spinner from 'components/Spinner';
import MatchListItem from 'components/RoundListItem/MatchListItem';
import { find, groupBy } from 'lodash';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { Page } from 'types/page';
import { UserContext } from 'context/userContext';

interface ITournamentHistoryItem {
  _id: string;
  name: string;
  date: string;
  score: string;
  matches: MatchWithUserInfo[];
}

const getScore = (matches: MatchWithUserInfo[], userId: string): number => {
  let score = 0;

  matches.forEach((match) => {
    if (match.white?._id === userId) {
      if (match.result === MatchResult.WhiteWon) {
        score = score + 1;
      }
    }

    if (match.black?._id === userId) {
      if (match.result === MatchResult.BlackWon) {
        score = score + 1;
      }
    }

    if (match.result === MatchResult.Draw) {
      score = score + 0.5;
    }

    if (!match.white || !match.black) {
      score = score + 1;
    }
  });

  return score;
};

const HistoryPage = (): JSX.Element => {
  const { data, loading } =
    useQuery<{ getMyMatchHistory: IHistoryResult }>(GET_MY_MATCH_HISTORY);

  const me = useContext(UserContext);
  const history = useHistory();

  const addedTournaments = new Set();
  const matches = data?.getMyMatchHistory.matches || [];
  const tournaments = data?.getMyMatchHistory.tournaments || [];
  const groupedMatches = groupBy(matches, 'tournamentId');
  const matchesWithTournaments: (MatchWithUserInfo | ITournamentHistoryItem)[] =
    [];

  matches.forEach((match) => {
    if (match.tournamentId) {
      if (!addedTournaments.has(match.tournamentId)) {
        const value = groupedMatches[match.tournamentId];
        const tournament = find(
          tournaments,
          (tournament) => tournament._id === match.tournamentId
        );

        if (value && tournament) {
          matchesWithTournaments.push({
            _id: tournament._id,
            score: `(${getScore(value, me?._id || '')}/${
              tournament.rounds.length
            })`,
            name: tournament.name,
            date: moment(tournament.date).format('ll'),
            matches: value
          });
          addedTournaments.add(match.tournamentId);
        }
      }
    } else {
      matchesWithTournaments.push(match);
    }
  });

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100%'
      }}
      mx={1}
    >
      <Box
        sx={{
          overflow: 'auto',
          borderColor: '#e5e5e5',
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        }}
      >
        <Box display={'flex'} justifyContent={'center'} height={'100%'}>
          {loading ? (
            <Spinner />
          ) : (
            <Box width={'100%'} maxWidth={'600px'} pt={2} px={1}>
              {matchesWithTournaments.length === 0 ? (
                <Box
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  fontStyle={'italic'}
                  height={'100%'}
                >
                  <Box>
                    <Typography variant="body1">
                      You have no match history
                    </Typography>
                    <Typography variant="subtitle2">
                      Play some games to get started
                    </Typography>
                  </Box>
                </Box>
              ) : (
                matchesWithTournaments.map((matchOrTournament, index) => (
                  <Box key={index} display={'flex'}>
                    {'name' in matchOrTournament ? (
                      <Box mb={3} width={'100%'}>
                        <Box
                          display={'flex'}
                          alignItems={'baseline'}
                          justifyContent={'space-between'}
                        >
                          <Box display={'flex'} alignItems={'baseline'}>
                            <Link
                              onClick={() =>
                                history.push(
                                  Page.ViewTournament.replace(
                                    ':tournamentId',
                                    matchOrTournament._id
                                  ) + history.location.search
                                )
                              }
                              underline={'hover'}
                              variant="h5"
                            >
                              {matchOrTournament.name}
                            </Link>
                            <Typography ml={1} variant={'body1'}>
                              {matchOrTournament.score}
                            </Typography>
                          </Box>

                          <Typography ml={2} variant={'body1'}>
                            {matchOrTournament.date}
                          </Typography>
                        </Box>

                        <Divider />

                        <Box mx={1}>
                          {matchOrTournament.matches.map((match, index) => (
                            <MatchListItem
                              key={index}
                              match={match}
                              tournamentId={matchOrTournament._id}
                            />
                          ))}
                        </Box>
                      </Box>
                    ) : (
                      <Box mx={2} width={'100%'}>
                        <Divider />
                        <Box mb={2} mt={1}>
                          <MatchListItem match={matchOrTournament} />
                        </Box>
                      </Box>
                    )}
                  </Box>
                ))
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default HistoryPage;
