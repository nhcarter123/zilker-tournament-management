import React, { useContext } from 'react';
import { UserContext } from 'context/userContext';
import { Box } from '@mui/material';
import AvatarEditor from 'react-avatar-editor';
import { Button } from 'antd';
import PlayerAvatar from 'components/PlayerAvatar';

const PictureEditor = (): JSX.Element => {
  const me = useContext(UserContext);

  if (!me) {
    return <></>;
  }

  const photo = me.photo;

  return (
    <Box>
      {photo ? (
        <Box display={'flex'} justifyContent={'center'} mb={2}>
          <AvatarEditor
            image={photo}
            width={200}
            height={200}
            border={20}
            color={[0, 0, 0, 0.6]} // RGBA
            scale={1.1}
            borderRadius={10000}
          />
        </Box>
      ) : (
        <PlayerAvatar player={me} />
      )}

      <Box display={'flex'} justifyContent={'center'}>
        <Button size={'large'} type="primary" onClick={(): void => {}}>
          Upload
        </Button>
        {photo && (
          <Box ml={2}>
            <Button size={'large'} type="primary" onClick={(): void => {}}>
              Remove
            </Button>
          </Box>
        )}
      </Box>

      {/*<input*/}
      {/*  type="file"*/}
      {/*  id="file"*/}
      {/*  ref={inputFile}*/}
      {/*  style={{ display: 'none' }}*/}
      {/*/>*/}
    </Box>
  );
};

export default PictureEditor;
