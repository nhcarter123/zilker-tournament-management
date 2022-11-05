import React, { SyntheticEvent, useContext, useEffect, useState } from 'react';

import { Box, Divider, Tab, Tabs } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { ReactComponent as BattleIcon } from 'image/smallBoard.svg';
import { UserContext } from 'context/userContext';
import { compact } from 'lodash';
import { useHistory, useLocation } from 'react-router-dom';
import { Page } from 'types/page';

export enum MenuItem {
  Home = 'Home',
  Events = 'Events',
  Challenge = 'Challenge',
  Profile = 'Profile',
  SignIn = 'Sign in'
}

const getIcon = (text: MenuItem): JSX.Element => {
  switch (text) {
    case MenuItem.Profile:
    case MenuItem.SignIn:
      return <AccountCircleIcon />;
    case MenuItem.Events:
      return <EmojiEventsIcon />;
    case MenuItem.Home:
      return <HomeIcon />;
    case MenuItem.Challenge:
      return <BattleIcon />;
    default:
      return <SettingsBackupRestoreIcon />;
  }
};

const getDestination = (text: MenuItem): string => {
  switch (text) {
    case MenuItem.Home:
      return Page.Home;
    case MenuItem.Events:
      return Page.Tournaments;
    case MenuItem.Challenge:
      return Page.Challenge;
    case MenuItem.SignIn:
      return Page.Login;
    case MenuItem.Profile:
    default:
      return Page.Profile;
  }
};

const getRoot = (text: MenuItem): string => {
  switch (text) {
    case MenuItem.Home:
      return Page.Home;
    case MenuItem.Events:
      return '/event';
    case MenuItem.Challenge:
      return Page.Challenge;
    case MenuItem.SignIn:
      return Page.Login;
    case MenuItem.Profile:
    default:
      return Page.Profile;
  }
};

const MainFooter = (): JSX.Element => {
  const history = useHistory();
  const me = useContext(UserContext);
  const page = useLocation().pathname;

  const menuItems = compact([
    MenuItem.Home,
    MenuItem.Events,
    MenuItem.Challenge,
    me && MenuItem.Profile,
    !me && MenuItem.SignIn
  ]);

  const index = menuItems.findIndex((item) => page.includes(getRoot(item)));
  const [currentTab, setCurrentTab] = useState<number>(index > -1 ? index : 0);

  useEffect(() => {
    if (index > -1) {
      setCurrentTab(index);
    }
  }, [index]);

  return (
    <Box width={'100%'} bgcolor={'white'} overflow={'hidden'}>
      <Box width={'100%'}>
        <Divider />
        <Box display={'flex'} justifyContent={'center'}>
          <Tabs
            sx={{
              '& .MuiTab-textColorPrimary': {
                minWidth: 0,
                padding: '12px min(5.5vw, 16px)',
                fontSize: 'min(3.3vw, 14px)'
              }
            }}
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
