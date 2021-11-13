import React from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { Typography } from '@mui/material/';
import Spinner from 'components/Spinner';

import { GET_TOURNAMENT } from 'graphql/queries/queries';
import { NEXT_ROUND } from 'graphql/mutations/mutations';
import { useStyles } from 'components/pages/app/TournamentPage/styles';
import { Tournament } from 'types/types';
import { Button, Popconfirm } from 'antd';
import { onError } from 'graphql/errorHandler';

interface PlayPageProps {
  isAdmin: boolean;
}

const TournamentPage = ({ isAdmin }: PlayPageProps): JSX.Element => {
  const { tournamentId } = useParams<{ tournamentId: string }>();
  const classes = useStyles();

  const { data: tournamentData, loading } = useQuery<{
    getTournament: Tournament;
  }>(GET_TOURNAMENT, {
    variables: {
      tournamentId
    }
  });

  const [nextRound, { loading: nextRoundLoading }] = useMutation(NEXT_ROUND, {
    refetchQueries: [GET_TOURNAMENT],
    onError
  });

  const tournament = tournamentData?.getTournament;

  // todo implement this for all users with isAdmin
  console.log(isAdmin);

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography variant={'h4'} align={'center'}>
          Tournament
        </Typography>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        tournament && (
          <div>
            <Typography variant={'h5'} align={'center'}>
              Rounds
            </Typography>

            <Popconfirm
              title="Are you sure?"
              placement={'bottom'}
              onConfirm={(): void => {
                nextRound({ variables: { tournamentId } });
              }}
            >
              <Button size={'large'} type="primary" loading={nextRoundLoading}>
                Next Round
              </Button>{' '}
            </Popconfirm>

            {tournament.rounds.map((round, index) => (
              <div key={index}>
                <div>{`Round ${index + 1}`}</div>
                {round.completed && <div>Completed</div>}
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default TournamentPage;
