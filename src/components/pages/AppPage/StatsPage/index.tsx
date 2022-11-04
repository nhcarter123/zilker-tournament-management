import React, { SyntheticEvent, useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material/';
import SwipeableViews from 'react-swipeable-views';
import GlobalStats from 'components/pages/AppPage/StatsPage/GlobalStats';
import PersonalStats from 'components/pages/AppPage/StatsPage/PersonalStats';

const StatsPage = (): JSX.Element => {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const handleChangeIndex = (index: number) => setCurrentTab(index);

  return (
    <Box height={'100%'} gridTemplateRows={'auto 1fr'} display={'grid'}>
      <Box
        zIndex={2}
        display={'flex'}
        justifyContent={'center'}
        boxShadow={
          'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.05) 0px 2px 6px 2px;'
        }
      >
        <Tabs
          value={currentTab}
          onChange={(event: SyntheticEvent, newValue: number) =>
            setCurrentTab(newValue)
          }
        >
          <Tab label={'Personal'} />
          <Tab label={'Global'} />
        </Tabs>
      </Box>

      <Box position={'relative'} height={'100%'} mx={1} overflow={'hidden'}>
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
          <SwipeableViews
            index={currentTab}
            style={{ height: '100%' }}
            containerStyle={{
              height: '100%',
              WebkitOverflowScrolling: 'touch'
            }}
            onChangeIndex={handleChangeIndex}
          >
            <PersonalStats />
            <GlobalStats />
          </SwipeableViews>
        </Box>
      </Box>
    </Box>
  );
};

export default StatsPage;
