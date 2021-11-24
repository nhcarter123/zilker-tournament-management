import React, { Dispatch, SetStateAction } from 'react';
import { Route, useHistory, useLocation } from 'react-router-dom';

import { IconButton, Box } from '@mui/material';
import TournamentHeader from 'components/MainHeader/TournamentHeader';
import SocialHeader from './SocialHeader';
import RulesHeader from './RulesHeader';
import ProfileHeader from './ProfileHeader';

import { Page } from 'types/page';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useStyles } from 'components/MainHeader/styles';
import TournamentsHeader from './TournamentsHeader';

interface MainHeaderProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const stripId = (route: string) => route.substring(0, route.lastIndexOf('/'));

const isPageEqual = (page: string, targets: string[]) => {
  const strippedPage = stripId(page);

  return targets.some((target) => stripId(target) === strippedPage);
};

const MainHeader = ({ setOpen }: MainHeaderProps): JSX.Element => {
  const history = useHistory();
  const page = useLocation().pathname;
  const classes = useStyles();

  const isBack = isPageEqual(page, [Page.EditMatch, Page.EditTournament]);

  console.log(isBack);
  console.log(page);
  console.log(Page.EditTournament);

  return (
    <Box display={'flex'}>
      <Box pr={1} display={'flex'}>
        <IconButton
          className={classes.icon}
          aria-label={'menu'}
          size={'large'}
          onClick={() => (isBack ? history.goBack() : setOpen(true))}
        >
          {isBack ? <ArrowBackIcon /> : <MenuIcon />}
        </IconButton>
      </Box>

      <Route path={Page.Play} component={TournamentHeader} />
      <Route path={Page.Tournaments} component={TournamentsHeader} />
      <Route path={Page.EditTournament} component={TournamentHeader} />
      <Route path={Page.EditMatch} component={TournamentHeader} />
      <Route path={Page.Profile} component={ProfileHeader} />
      <Route path={Page.Social} component={SocialHeader} />
      <Route path={Page.Rules} component={RulesHeader} />
    </Box>
  );
};

export default MainHeader;
