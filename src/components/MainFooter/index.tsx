import React, { SyntheticEvent, useContext, useState } from 'react';

import { Box, Divider, Tab, Tabs } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import HomeIcon from '@mui/icons-material/Home';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import { MyTournamentContext } from 'context/myTournamentContext';
import { UserContext } from 'context/userContext';
import { compact } from 'lodash';
import { useHistory, useLocation } from 'react-router-dom';
import { Page } from 'types/page';

// enum MenuItem {
//   Play = 'My tournament',
//   Profile = 'Profile',
//   SignIn = 'Sign in',
//   Tournaments = 'Tournaments',
//   Rules = 'Rules',
//   Community = 'Community',
//   Stats = 'Stats',
//   Donate = 'Donate',
//   About = 'About'
// }

export enum MenuItem {
  Play = 'My tournament',
  Profile = 'Profile',
  SignIn = 'Sign in',
  Home = 'Home',
  History = 'History',
  Stats = 'Stats'
}

const getIcon = (text: MenuItem): JSX.Element => {
  switch (text) {
    case MenuItem.Profile:
    case MenuItem.SignIn:
      return <AccountCircleIcon />;
    case MenuItem.Stats:
      return <TrendingUpIcon />;
    case MenuItem.Home:
      return <HomeIcon />;
    case MenuItem.History:
      return <ReceiptLongIcon />;
    case MenuItem.Play:
    default:
      return <SettingsBackupRestoreIcon />;
  }
};

const getDestination = (text: MenuItem): string => {
  switch (text) {
    case MenuItem.Home:
      return Page.Home;
    case MenuItem.Stats:
      return Page.Stats;
    case MenuItem.History:
      return Page.History;
    case MenuItem.SignIn:
      return Page.Login;
    case MenuItem.Play:
      return Page.Tournament.replace(':tournamentId', '');
    case MenuItem.Profile:
    default:
      return Page.Profile;
  }
};

const MainFooter = (): JSX.Element => {
  const history = useHistory();
  const { myTournamentId } = useContext(MyTournamentContext);
  const me = useContext(UserContext);

  const page = useLocation().pathname;

  const menuItems = compact([
    // myTournamentId && MenuItem.Play,
    MenuItem.Home,
    MenuItem.History,
    MenuItem.Stats,
    me && MenuItem.Profile,
    !me && MenuItem.SignIn
  ]);

  const index = menuItems.findIndex((item) => getDestination(item) === page);
  const [currentTab, setCurrentTab] = useState<number>(index > -1 ? index : 0);

  return (
    <Box width={'100%'} bgcolor={'white'} pb={1} overflow={'hidden'}>
      <Box width={'100%'}>
        <Divider />
        <Box display={'flex'} justifyContent={'center'}>
          <Tabs
            value={currentTab}
            onChange={(event: SyntheticEvent, newValue: number) =>
              setCurrentTab(newValue)
            }
          >
            {menuItems.map((item, index) => (
              <Tab
                key={index}
                icon={getIcon(item)}
                label={item}
                onClick={(): void =>
                  history.push(getDestination(item) + history.location.search)
                }
              />
            ))}
          </Tabs>
        </Box>
      </Box>
    </Box>
  );
};

export default MainFooter;
