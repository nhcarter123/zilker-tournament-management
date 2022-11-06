import React, { useContext } from 'react';
import { Box, Typography } from '@mui/material/';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useQuery } from '@apollo/client';
import { IDataPoint, IStatsResult } from 'types/types';
import { GET_MY_STATS } from 'graphql/definitions/queries';
import Bold from 'components/Bold';
import Spinner from 'components/Spinner';
import { UserContext } from 'context/userContext';
import { THEME_PRIMARY } from 'constants/constants';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { Page } from 'types/page';

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const color = '#51d623';
const bgColor = '#9dff7a';

const mapToGraph = (dataPoints: IDataPoint[]) => ({
  labels: dataPoints.map((dataPoint) => dataPoint.label),
  datasets: [
    {
      data: dataPoints.map((dataPoint) => dataPoint.value),
      borderColor: color,
      backgroundColor: bgColor
    }
  ]
});
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

export const options = {
  // responsive: true,
  plugins: {
    title: {
      display: false,
      text: 'Chart.js Line Chart'
    }
  }
};

const PersonalStats = (): JSX.Element => {
  const me = useContext(UserContext);
  const history = useHistory();

  const { data, loading } = useQuery<{
    getMyStats: IStatsResult;
  }>(GET_MY_STATS, { fetchPolicy: 'cache-and-network' });

  const ratingData = data?.getMyStats.ratingOverTime;

  return (
    <Box pt={2} px={1} height={'100%'}>
      {me ? (
        loading ? (
          <Spinner />
        ) : (
          <Box>
            <Box mb={2}>
              <Typography variant={'h6'}>Rating Vs Time</Typography>
              {ratingData && (
                <Line data={mapToGraph(ratingData)} options={options} />
              )}
            </Box>

            <Box mb={2}>
              <Typography variant={'body1'} component={'span'}>
                <Bold>Your rating</Bold>
              </Typography>
              <Typography variant={'body2'}>Rating: {me?.rating}</Typography>
              <Box color={'#bebebe'}>
                <Typography variant={'body2'}>
                  Progression over the last 12 games
                </Typography>
                <Typography variant={'body2'}>Percentile</Typography>
              </Box>
            </Box>

            <Box mb={2}>
              <Typography variant={'body1'} component={'span'}>
                <Bold>Rating stats</Bold>
              </Typography>
              <Box color={'#bebebe'}>
                <Typography variant={'body2'}>Average opponent</Typography>
                <Typography variant={'body2'}>Highest rating</Typography>
                <Typography variant={'body2'}>Lowest rating</Typography>
              </Box>
            </Box>

            <Box mb={2}>
              <Typography variant={'body1'} component={'span'}>
                <Bold>Games</Bold>
              </Typography>
              <Box color={'#bebebe'}>
                <Typography variant={'body2'}>Wins</Typography>
                <Typography variant={'body2'}>Draws</Typography>
                <Typography variant={'body2'}>Losses</Typography>
                <Typography variant={'body2'}>Winrate with white</Typography>
                <Typography variant={'body2'}>Winrate with black</Typography>
              </Box>
            </Box>
          </Box>
        )
      ) : (
        <Box
          height={'100%'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Box>
            <Typography mb={1} variant={'body1'}>
              Sign in the view personal stats
            </Typography>
            <Button
              style={{
                background: THEME_PRIMARY,
                borderColor: THEME_PRIMARY
              }}
              size={'middle'}
              type="primary"
              onClick={() =>
                history.push(
                  Page.Login + `?page=${Page.Stats}${history.location.search}`
                )
              }
              block
            >
              Sign in
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default PersonalStats;
