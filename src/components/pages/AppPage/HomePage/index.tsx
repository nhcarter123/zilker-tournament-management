import React from 'react';
import { Box, Typography } from '@mui/material/';
import AboutPage from 'components/pages/AppPage/AboutPage';
import { Page } from 'types/page';
import { useHistory } from 'react-router-dom';
import EventImage from 'image/event.jpg';
import BattleImage from 'image/battle.png';
import ChallengeImage from 'image/challenge.png';
import CalendarImage from 'image/calendar.png';
import PlannerImage from 'image/planner.png';
import CommunityImage from 'image/community.png';
import BookImage from 'image/book.png';
import DonateImage from 'image/donate.png';
import AltImage from 'image/alt.png';
import { THEME_SECONDARY } from 'constants/constants';
import { getPageName } from 'helpers/helpers';

interface IHomePageCardProps {
  image: string;
  redirect: Page;
}

const HomePageCard = ({ image, redirect }: IHomePageCardProps) => {
  const history = useHistory();
  const onClick = () => history.push(redirect + history.location.search);

  return (
    <Box
      sx={{
        // background: '#f8f8f8',
        borderRadius: '4px',
        overflow: 'hidden',
        boxShadow:
          'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;'
      }}
      onClick={onClick}
    >
      <Box
        pl={1}
        sx={{
          width: '100%',
          background: THEME_SECONDARY
        }}
      >
        <Typography variant={'h5'}>{getPageName(redirect)}</Typography>
      </Box>
      <Box m={1} position={'relative'}>
        <img style={{ width: '100%' }} src={AltImage} alt={'event'} />
        <Box position={'absolute'} top={0}>
          <img style={{ width: '100%' }} src={image} alt={'event'} />
        </Box>
      </Box>
    </Box>
  );
};

const HomePage = (): JSX.Element => {
  return (
    <Box height={'100%'} display={'flex'} justifyContent={'center'}>
      <Box
        sx={{
          position: 'relative',
          height: '100%',
          width: '100%'
        }}
      >
        <Box
          sx={{
            overflow: 'auto',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
          }}
        >
          <Box display={'flex'} justifyContent={'center'}>
            <Box
              maxWidth={'600px'}
              width={'100%'}
              p={2}
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gridGap: '8px'
              }}
            >
              <HomePageCard image={PlannerImage} redirect={Page.Tournaments} />
              <HomePageCard image={BattleImage} redirect={Page.Challenge} />
              <HomePageCard image={CommunityImage} redirect={Page.Community} />
              <HomePageCard image={BookImage} redirect={Page.About} />
              <HomePageCard image={DonateImage} redirect={Page.Donate} />
            </Box>
            {/*<AboutPage />*/}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
