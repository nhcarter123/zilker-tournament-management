import React from 'react';
import { Box, IconButton, Typography } from '@mui/material/';

import FacebookIcon from '@mui/icons-material/Facebook';
import MeetupIcon from 'svg/meetup.svg';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  icon: {
    width: '150px',
    height: '150px',
    '& > svg': {
      color: '#1570f5',
      width: '200px',
      height: '200px'
    }
  }
});

const SocialPage = (): JSX.Element => {
  const classes = useStyles();

  return (
    <Box mt={6.5}>
      <Typography variant={'h5'} align={'center'}>
        Social
      </Typography>

      <Typography variant={'body1'}>
        Stay connected by joining our facebook and meetup groups!
      </Typography>
      <Typography variant={'body1'}>We'd love to have you 🤗</Typography>

      <Box mt={6} display={'flex'} justifyContent={'space-between'}>
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
          <img src={MeetupIcon} width={150} height={150} alt={'Meetup Icon'} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default SocialPage;
