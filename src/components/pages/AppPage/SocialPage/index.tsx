import React from 'react';
import { Box, IconButton, Typography } from '@mui/material/';

import { ReactComponent as FacebookIcon } from 'svg/facebook.svg';
import { ReactComponent as MeetupIcon } from 'svg/meetup.svg';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  icon: {
    width: '150px',
    height: '150px',
    '& > svg': {
      color: '#1570f5',
      width: '150px',
      height: '150px'
    }
  }
});

const SocialPage = (): JSX.Element => {
  const classes = useStyles();

  return (
    <Box mt={1}>
      <Typography variant={'body1'}>
        Stay connected by joining our facebook and meetup groups!
      </Typography>
      <Typography variant={'body1'}>We'd love to have you 🤗</Typography>

      <Box mt={4} display={'flex'} justifyContent={'center'}>
        <IconButton
          className={classes.icon}
          aria-label="facebook.com/groups/866344480633533"
          onClick={() =>
            window.open('https://www.facebook.com/groups/866344480633533')
          }
        >
          <FacebookIcon />
        </IconButton>

        <IconButton
          className={classes.icon}
          aria-label="https://meetu.ps/c/4RRKm/SMYrc/d"
          onClick={() => window.open('https://meetu.ps/c/4RRKm/SMYrc/d')}
        >
          <MeetupIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default SocialPage;
