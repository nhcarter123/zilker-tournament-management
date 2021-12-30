import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Typography } from '@mui/material/';
import { useStyles } from 'components/pages/AppPage/TournamentPage/PlayPage/WaitingPage/styles';
import { Button } from 'antd';
import { Page } from 'types/page';
import { MyTournamentContext } from '../../../../../../context/myTournamentContext';

interface CompletedPageProps {
  tournamentId: string;
}

const CompletedPage = ({ tournamentId }: CompletedPageProps): JSX.Element => {
  const { setMyTournamentId } = useContext(MyTournamentContext);
  const history = useHistory();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <Typography variant={'h5'} align={'center'}>
          The tournament has finished!
        </Typography>

        <Box mt={4} display={'flex'} justifyContent={'center'}>
          <Button
            size={'large'}
            type="primary"
            className={classes.root}
            onClick={(): void => {
              setMyTournamentId(null);
              history.push(
                Page.ViewTournament.replace(':tournamentId', tournamentId)
              );
            }}
          >
            Check Results
          </Button>
        </Box>

        <Box mt={6} display={'flex'} justifyContent={'center'}>
          <Button
            type={'default'}
            className={classes.root}
            onClick={(): void => {
              setMyTournamentId(null);
              history.push(Page.Tournaments);
            }}
          >
            Back to tournaments
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default CompletedPage;