import React, { Dispatch, SetStateAction } from 'react';
import { useHistory } from 'react-router-dom';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Divider from '@mui/material/Divider';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import { Pages } from 'types/pages';
import { useStyles } from 'components/SideMenu/styles';

enum MenuItem {
  play = 'Play',
  profile = 'Profile',
  tournaments = 'Tournaments',
  players = 'Players',
  rules = 'Rules'
}

interface SideMenuProps {
  isAdmin: boolean;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const SideMenu = ({ open, setOpen, isAdmin }: SideMenuProps): JSX.Element => {
  const classes = useStyles();
  const history = useHistory();

  const menuItems = [
    MenuItem.play,
    MenuItem.profile,
    isAdmin && MenuItem.tournaments,
    isAdmin && MenuItem.players,
    MenuItem.rules
  ].filter((v) => v) as MenuItem[];

  const generateMenuList = (list: string[]): JSX.Element => {
    const getIcon = (text: string): JSX.Element => {
      switch (text) {
        case MenuItem.players:
          return <InboxIcon />;
        case MenuItem.profile:
          return <InboxIcon />;
        case MenuItem.tournaments:
          return <InboxIcon />;
        case MenuItem.rules:
          return <InboxIcon />;
        case MenuItem.play:
        default:
          return <InboxIcon />;
      }
    };

    const getDestination = (text: string): string => {
      switch (text) {
        case MenuItem.players:
          return Pages.players;
        case MenuItem.profile:
          return Pages.profile;
        case MenuItem.tournaments:
          return Pages.tournaments;
        case MenuItem.rules:
          return Pages.rules;
        case MenuItem.play:
        default:
          return Pages.play;
      }
    };

    return (
      <List>
        {list.map((text) => (
          <div key={text}>
            <ListItem
              button
              onClick={(): void => history.push(getDestination(text))}
            >
              <div className={classes.listItem}>
                <ListItemIcon>{getIcon(text)}</ListItemIcon>
                <ListItemText primary={text} />
              </div>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    );
  };

  return (
    <SwipeableDrawer
      anchor={'left'}
      open={open}
      onClose={(): void => setOpen(false)}
      onOpen={(): void => setOpen(true)}
    >
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={(): void => setOpen(false)}
        onKeyDown={(): void => setOpen(false)}
      >
        {generateMenuList(menuItems)}
      </Box>
    </SwipeableDrawer>
  );
};

export default SideMenu;
