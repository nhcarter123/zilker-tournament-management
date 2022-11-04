import React, { useContext } from 'react';
import { Box, Typography } from '@mui/material';
import { THEME_PRIMARY } from 'constants/constants';
import { useHistory } from 'react-router-dom';
import { Page } from 'types/page';
import { getPageName } from 'helpers/helpers';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { MyTournamentContext } from 'context/myTournamentContext';

interface SimpleHeaderProps {
  title: string;
  back?: Page;
}

const SimpleHeader = ({ title, back }: SimpleHeaderProps): JSX.Element => {
  const history = useHistory();
  const { myTournamentId } = useContext(MyTournamentContext);

  return (
    <Box pt={1} pb={0.5} bgcolor={THEME_PRIMARY}>
      <Box
        display={'grid'}
        gridTemplateColumns={'1fr 1fr 1fr'}
        alignItems={'center'}
      >
        <Box ml={1}>
          {back && (
            <Box
              color={'#fff'}
              display={'flex'}
              alignItems={'center'}
              onClick={() => history.push(back + history.location.search)}
            >
              <ArrowBackIosNewIcon fontSize={'small'} />
              <Typography variant={'body2'} color={'#fff'}>
                {getPageName(back)}
              </Typography>
            </Box>
          )}
        </Box>
        <Box display={'flex'} justifyContent={'center'}>
          <Typography variant={'h5'} color={'#fff'}>
            {title}
          </Typography>
        </Box>
        <Box mr={1}>
          {myTournamentId && (
            <Box
              color={'#fff'}
              display={'flex'}
              alignItems={'center'}
              justifyContent={'end'}
              onClick={() =>
                history.push(
                  Page.Tournament.replace(':tournamentId', myTournamentId) +
                    history.location.search
                )
              }
            >
              <Typography
                lineHeight={'14px'}
                variant={'body2'}
                color={'#fff'}
                mr={0.5}
                textAlign={'right'}
              >
                Return to tournament
              </Typography>
              <ArrowBackIosNewIcon
                fontSize={'small'}
                style={{ transform: 'rotate(180deg)' }}
              />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SimpleHeader;
