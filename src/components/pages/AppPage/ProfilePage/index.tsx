import React, { useContext } from 'react';
import { Box, Typography } from '@mui/material/';
import { UserContext } from 'context/userContext';
import PlayerAvatar from 'components/PlayerAvatar';
import Bold from 'components/Bold';
import PictureEditor from 'components/PictureEditor';

const ProfilePage = (): JSX.Element => {
  const me = useContext(UserContext);
  // const inputFile = useRef<HTMLInputElement>(null);
  // const picture =
  //   'https://media.istockphoto.com/photos/cute-kitten-licking-glass-table-with-copy-space-picture-id1293763250?b=1&k=20&m=1293763250&s=170667a&w=0&h=zcK63xxkMVX-ca0d5laTsDxauVUMH62F71MKcbqaGnI=';

  return me ? (
    <Box mt={3}>
      <PictureEditor />

      <PlayerAvatar player={me} large />

      <Box mt={2} mb={1}>
        <Typography align={'center'} variant={'body1'} component={'span'}>
          <Bold>{`${me.firstName} ${me.lastName}`}</Bold>
        </Typography>
        <Typography align={'center'} variant={'body1'}>
          {`Rating: ${me.rating}`}
        </Typography>{' '}
        <Typography align={'center'} variant={'body1'}>
          {`Matches played: ${me.matchesPlayed}`}
        </Typography>
      </Box>

      <Typography variant={'h5'} align={'center'} mt={3}>
        Tournament History
      </Typography>
      <Typography variant={'body1'} align={'center'} mt={2}>
        TODO
      </Typography>
    </Box>
  ) : (
    <></>
  );
};

export default ProfilePage;
