import React from 'react';
import { Box, Typography } from '@mui/material/';
import { Button } from 'antd';

const DonatePage = (): JSX.Element => {
  return (
    <Box m={2}>
      <Typography variant={'body2'}>
        Help out with drinks, prizes, and our expensive development team
      </Typography>
      <Typography mt={1} variant={'body1'}>
        All support is appreciated 🙂
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
