import React from 'react';
import { Box, IconButton, Typography } from '@mui/material/';

import { ReactComponent as FacebookIcon } from 'image/facebook.svg';
import { ReactComponent as MeetupIcon } from 'image/meetup.svg';
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

const CommunityPage = (): JSX.Element => {
  const classes = useStyles();

  return (
    <Box m={2}>
      <Typography variant={'h5'}>Are you a developer? 👨‍💻</Typography>
      <Typography variant={'body2'}>
        View and contribute to the project here:
      </Typography>
      <a
        href="https://github.com/nhcarter123/zilker-tournament-management"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Typography variant={'body1'}>Client source code</Typography>
      </a>
      <a
        href="https://github.com/nhcarter123/zilker-tournament-server"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Typography variant={'body1'}>Server source code</Typography>
      </a>

      <Box mt={4}>
        <Typography variant={'h5'}>Want to keep up to date?</Typography>
        <Typography variant={'body2'}>
          Stay connected by joining our facebook and meetup groups!
        </Typography>
        <Typography variant={'body2'}>We&apos;d love to have you 🤗</Typography>

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
    </Box>
  );
};

export default CommunityPage;
