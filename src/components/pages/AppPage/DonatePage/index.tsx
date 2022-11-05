import React from 'react';
import { Box, Typography } from '@mui/material/';
import { Button } from 'antd';

const DonatePage = (): JSX.Element => {
  return (
    <Box m={2}>
      <Typography variant={'body1'}>
        Help support the vision of open source software
      </Typography>
      <Typography variant={'body1'}>
        Money goes towards providing free drinks and equipment at tournaments
      </Typography>

      <Box mt={3} display={'flex'} justifyContent={'center'}>
        <Button
          size={'large'}
          type="primary"
          onClick={(): void => {
            window.location.href =
              'https://venmo.com/code?user_id=2972086481977344554&created=1639176834';
          }}
        >
          Venmo
        </Button>
      </Box>
    </Box>
  );
};

export default DonatePage;
