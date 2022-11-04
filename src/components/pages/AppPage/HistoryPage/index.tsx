import React from 'react';
import { Box, Divider, Link, Typography } from '@mui/material/';
import { IHistoryResult, MatchWithUserInfo } from 'types/types';
import { useQuery } from '@apollo/client';
import { GET_MY_MATCH_HISTORY } from 'graphql/definitions/queries';
import Spinner from 'components/Spinner';
import MatchListItem from 'components/RoundListItem/MatchListItem';
import { find, groupBy } from 'lodash';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { Page } from 'types/page';

interface ITournamentHistoryItem {
  _id: string;
  name: string;
  date: string;
  matches: MatchWithUserInfo[];
}

const HistoryPage = (): JSX.Element => {
  const { data, loading } = useQuery<
    { getMyMatchHistory: IHistoryResult },
    { tournamentId: string }
  >(GET_MY_MATCH_HISTORY);

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
            <Box width={'100%'} maxWidth={'600px'}>
              {matchesWithTournaments.map((matchOrTournament, index) => (
                <Box key={index} display={'flex'}>
                  {'name' in matchOrTournament ? (
                    <Box mt={3} width={'100%'} px={1}>
                      <Box
                        display={'flex'}
                        alignItems={'baseline'}
                        justifyContent={'space-between'}
                      >
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
                    <MatchListItem match={matchOrTournament} />
                  )}
                  {/*<Box>{match.white?.firstName}</Box>*/}
                  {/*<Box>{match.white?.firstName}</Box>*/}
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default HistoryPage;
