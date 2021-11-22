import React, { Dispatch, SetStateAction } from 'react';
import { Route } from 'react-router-dom';

import { IconButton, Box } from '@mui/material';
import TournamentHeader from 'components/MainHeader/TournamentHeader';
import SocialHeader from './SocialHeader';
import RulesHeader from './RulesHeader';
import ProfileHeader from './ProfileHeader';

import { Page } from 'types/page';
import MenuIcon from '@mui/icons-material/Menu';
import { useStyles } from 'components/MainHeader/styles';
import TournamentsHeader from './TournamentsHeader';

interface MainHeaderProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const MainHeader = ({ setOpen }: MainHeaderProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Box display={'flex'}>
      <Box pr={1} display={'flex'}>
        <IconButton
          className={classes.icon}
          aria-label={'menu'}
          size={'large'}
          onClick={() => setOpen(true)}
        >
          <MenuIcon />
        </IconButton>
      </Box>

      <Route path={Page.Play} component={TournamentHeader} />
      <Route path={Page.Tournaments} component={TournamentsHeader} />
      <Route path={Page.EditTournament} component={TournamentHeader} />
      <Route path={Page.Profile} component={ProfileHeader} />
      <Route path={Page.Social} component={SocialHeader} />
      <Route path={Page.Rules} component={RulesHeader} />
    </Box>
  );
};

export default MainHeader;
