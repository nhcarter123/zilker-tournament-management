import React from 'react';
import moment from 'moment';

import { Typography } from '@mui/material/';
import JoinTournamentButton from 'components/buttons/JoinTournamentButton';

import { Tournament } from 'types/types';

interface JoinPageProps {
  tournament: Nullable<Tournament>;
}

const JoinPage = ({ tournament }: JoinPageProps): JSX.Element => {
  return (
    <div>
      {tournament ? (
        <>
          <Typography variant={'h4'} align={'center'}>
            {tournament.name}
          </Typography>
          <Typography variant={'subtitle2'} align={'center'}>
            {moment(tournament.date).format('LL')}
          </Typography>
          <Typography variant={'subtitle2'} align={'center'}>
            {`${tournament.players.length} player${
              tournament.players.length !== 1 ? 's' : ''
            } have joined so far`}
          </Typography>
          <JoinTournamentButton tournamentId={tournament._id} />
        </>
      ) : (
        <>
          <Typography variant={'h4'} align={'center'}>
            Uh oh
          </Typography>
          <div>
            It looks like there aren’t any active tournaments right now... 😢
          </div>
        </>
      )}
    </div>
  );
};

export default JoinPage;
