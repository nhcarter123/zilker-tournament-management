import React from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { Button, Popconfirm } from 'antd';
import { Box, Typography, Divider } from '@mui/material/';
import Spinner from 'components/Spinner';
import TournamentHeader from 'components/TournamentHeader';
import RoundListItem from 'components/RoundListItem';

import { GET_TOURNAMENT } from 'graphql/queries/queries';
import { NEXT_ROUND } from 'graphql/mutations/mutations';
import { useStyles } from 'components/pages/app/TournamentPage/styles';
import { Tournament } from 'types/types';
import { onError } from 'graphql/errorHandler';

interface PlayPageProps {
  isAdmin: boolean;
}

const TournamentPage = ({ isAdmin }: PlayPageProps): JSX.Element => {
  const { tournamentId } = useParams<{ tournamentId: string }>();
  const classes = useStyles();

  const { data: tournamentData, loading } = useQuery<{
    getTournament: Nullable<Tournament>;
  }>(GET_TOURNAMENT, {
    variables: {
      tournamentId
    }
  });

  const [nextRound, { loading: nextRoundLoading }] = useMutation(NEXT_ROUND, {
    refetchQueries: [GET_TOURNAMENT],
    onError
  });

  const tournament = tournamentData?.getTournament || null;

  // todo implement this for all users with isAdmin
  console.log(isAdmin);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        tournament && (
          <>
            <TournamentHeader tournament={tournament} />

            <div className={classes.content}>
              <Typography variant={'h5'} align={'center'} mb={1}>
                Rounds
              </Typography>

              {tournament.rounds.map((round, index) => (
                <RoundListItem
                  key={index}
                  index={index}
                  tournament={tournament}
                  round={round}
                />
              ))}

              <Box mt={3}>
                <Popconfirm
                  title="Are you sure?"
                  placement={'bottom'}
                  onConfirm={(): void => {
                    nextRound({ variables: { tournamentId } });
                  }}
                >
                  <Button
                    size={'large'}
                    type="primary"
                    loading={nextRoundLoading}
                    block
                  >
                    Next Round
                  </Button>
                </Popconfirm>
              </Box>

              <Box mt={8}>
                <Divider />
              </Box>
            </div>
          </>
        )
      )}
    </>
  );
};

export default TournamentPage;
