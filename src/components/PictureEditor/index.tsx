import React, { useContext, useRef, useState } from 'react';
import { UserContext } from 'context/userContext';
import { Box, Slider } from '@mui/material';
import AvatarEditor from 'react-avatar-editor';
import { Button } from 'antd';
import PlayerAvatar from 'components/PlayerAvatar';
import { useMutation } from '@apollo/client';
import { DELETE_PHOTO, UPLOAD_PHOTO } from 'graphql/mutations/mutations';
import { GET_ME } from 'graphql/queries/queries';
import { onError } from 'graphql/errorHandler';
import Spinner from 'components/Spinner';

const PictureEditor = (): JSX.Element => {
  const [localFile, setLocalFile] = useState<Nullable<File>>(null);
  const [scale, setScale] = useState<number>(15);
  const me = useContext(UserContext);
  const inputFile = useRef<HTMLInputElement>(null);
  const editor = useRef<AvatarEditor>(null);

  const [uploadPhoto, { loading: uploadLoading }] = useMutation(UPLOAD_PHOTO, {
    refetchQueries: [GET_ME],
    onError
  });

  const [deletePhoto, { loading: deleteLoading }] = useMutation(DELETE_PHOTO, {
    refetchQueries: [GET_ME],
    onError
  });

  if (!me) {
    return <></>;
  }

  const photo = me.photo;

  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      className={'dashed'}
      sx={{
        maxHeight: '364px',
        minWidth: '268px',
        padding: '24px',
        width: 'min-content',
        margin: 'auto'
      }}
    >
      {uploadLoading || deleteLoading ? (
        <Spinner />
      ) : (
        <Box>
          <Box display={'flex'} justifyContent={'center'} mb={2}>
            {localFile ? (
              <AvatarEditor
                ref={editor}
                image={localFile}
                width={180}
                height={180}
                border={20}
                color={[0, 0, 0, 0.5]}
                scale={0.9 + scale / 50}
                borderRadius={10000}
              />
            ) : (
              <PlayerAvatar player={me} size={180} />
            )}
          </Box>

          {localFile && (
            <Slider
              aria-label="Scale"
              value={scale}
              onChange={(_event, newValue: number | number[]): void => {
                if (!Array.isArray(newValue)) {
                  setScale(newValue);
                }
              }}
            />
          )}

          <Box display={'flex'} justifyContent={'center'}>
            {localFile ? (
              <Button
                size={'middle'}
                type="primary"
                onClick={(): void => {
                  editor.current?.getImageScaledToCanvas().toBlob((blob) => {
                    void uploadPhoto({
                      variables: {
                        photo: blob
                      }
                    });
                    setLocalFile(null);
                  });
                }}
              >
                Save
              </Button>
            ) : (
              <Button
                size={'middle'}
                type="primary"
                onClick={(): void => {
                  inputFile.current?.click();
                }}
              >
                Upload
              </Button>
            )}
            {localFile && (
              <Box ml={2}>
                <Button
                  size={'middle'}
                  type="primary"
                  onClick={(): void => {
                    if (inputFile.current) {
                      inputFile.current.value = '';
                      setLocalFile(null);
                    }
                  }}
                >
                  Cancel
                </Button>
              </Box>
            )}
            {!localFile && photo && (
              <Box ml={2}>
                <Button
                  size={'middle'}
                  type="primary"
                  onClick={(): void => void deletePhoto()}
                >
                  Remove
                </Button>
              </Box>
            )}
          </Box>

          <input
            type="file"
            id="file"
            ref={inputFile}
            style={{ display: 'none' }}
            onInput={() => {
              const files = inputFile.current?.files;
              if (files && files.length) {
                setLocalFile(files[0] || null);
              }
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default PictureEditor;
