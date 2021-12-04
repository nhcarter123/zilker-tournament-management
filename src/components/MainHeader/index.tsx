import React, { Dispatch, SetStateAction } from 'react';
import { Route, useHistory, useLocation } from 'react-router-dom';

import { IconButton, Box } from '@mui/material';
import TournamentHeader from 'components/MainHeader/TournamentHeader';
import TournamentsHeader from 'components/MainHeader/TournamentsHeader';
import SocialHeader from 'components/MainHeader//SocialHeader';
import RulesHeader from 'components/MainHeader//RulesHeader';
import ProfileHeader from 'components/MainHeader//ProfileHeader';
import JoinHeader from 'components/MainHeader//JoinHeader';
import PlayHeader from 'components/MainHeader//PlayHeader';

import { Page } from 'types/page';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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

  const isBack = isPageEqual(page, [Page.EditMatch, Page.EditTournament]);

  return (
    <Box display={'flex'}>
      <Box display={'flex'}>
        <IconButton
          aria-label={'menu'}
          size={'large'}
          onClick={() => (isBack ? history.goBack() : setOpen(true))}
        >
          {isBack ? <ArrowBackIcon /> : <MenuIcon />}
        </IconButton>
      </Box>

      <Route path={Page.Join} component={JoinHeader} exact />
      <Route path={Page.Waiting} component={TournamentHeader} exact />
      <Route path={Page.Play} component={PlayHeader} exact />
      <Route path={Page.Tournaments} component={TournamentsHeader} />
      <Route path={Page.EditTournament} component={TournamentHeader} />
      <Route path={Page.EditMatch} component={TournamentHeader} />
      <Route path={Page.Match} component={TournamentHeader} />
      <Route path={Page.Profile} component={ProfileHeader} />
      <Route path={Page.Social} component={SocialHeader} />
      <Route path={Page.Rules} component={RulesHeader} />
    </Box>
  );
};

export default MainHeader;
