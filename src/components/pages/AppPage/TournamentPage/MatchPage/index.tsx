import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_MATCH, GET_MY_MATCH } from 'graphql/queries/queries';
import { useMediaQuery } from 'react-responsive';

import Spinner from 'components/Spinner';
import Player from 'components/Player';
import MatchResultSelect from 'components/MatchResultSelect';

import ChessBoard from 'svg/chessBoard.svg';

import { useStyles } from 'components/pages/AppPage/TournamentPage/MatchPage/styles';
import { Box, Divider, Typography } from '@mui/material';
import { useHistory, useParams } from 'react-router-dom';
import { Match, MatchWithUserInfo, Tournament } from 'types/types';
import { Page } from 'types/page';

interface MatchPageProps {
  tournament: Nullable<Tournament>;
}

const MatchPage = ({ tournament }: MatchPageProps): JSX.Element => {
  const history = useHistory();
  const { matchId } = useParams<{ matchId: string }>();
  const shortWindow = useMediaQuery({ query: `(max-height: 590px)` });
  const classes = useStyles();

  // todo this !== 'bye' shit has to get abstracted to somewhere

  const { loading: loadingGetMyMatch } = useQuery<{
    getMyMatch: Nullable<Match>;
  }>(GET_MY_MATCH, {
    fetchPolicy: 'network-only',
    skip: matchId !== 'find',
    onCompleted: (data) => {
      if (tournament) {
        history.push(
          Page.Match.replace(':tournamentId', tournament._id).replace(
            ':matchId',
            data?.getMyMatch?._id || 'none'
          )
        );
      }
    }
  });

  const { data: matchData, loading } = useQuery<{
    getMatch: Nullable<MatchWithUserInfo>;
  }>(GET_MATCH, {
    skip: matchId === 'find',
    variables: { matchId },
    // fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true
    // pollInterval: 4000, // todo rewrite using subscriptions (who knew that was a thing??)
  });

  const whitePlayer = matchData?.getMatch?.white;
  const blackPlayer = matchData?.getMatch?.black;
  const match = matchData?.getMatch;

  return (
    <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
      {loadingGetMyMatch || loading ? (
        <Spinner />
      ) : !whitePlayer || !blackPlayer || !match ? (
        <div>
          <Typography>You don’t have an opponent for this round.</Typography>
          <Typography>
            You’ll have to wait until the next round... 😑
          </Typography>
        </div>
      ) : (
        <Box>
          <Player
            player={blackPlayer}
            ratingBefore={match.blackRating}
            ratingAfter={match.newBlackRating}
            hideAvatar={shortWindow}
          />

          <Box className={classes.boardContainer}>
            <div
              style={{
                position: 'relative',
                border: '5px solid rgb(191 191 191)',
                borderRadius: '8px'
              }}
            >
              <div className={classes.boardNumber}>
                <Typography
                  variant={'h6'}
                >{`#${match.boardNumber}`}</Typography>
              </div>
              <img
                src={ChessBoard}
                width={150}
                height={150}
                alt={'Chess board'}
              />
            </div>
          </Box>

          <Player
            player={whitePlayer}
            ratingBefore={match.whiteRating}
            ratingAfter={match.newWhiteRating}
            hideAvatar={shortWindow}
          />

          <Divider />

          <MatchResultSelect match={match} matchLoading={loading} />
        </Box>
      )}
    </Box>
  );
};

export default MatchPage;
