import React, { useRef, useState } from 'react';
import { Box, Slider } from '@mui/material';
import AvatarEditor from 'react-avatar-editor';
import { Button } from 'antd';
import { useMutation } from '@apollo/client';
import {
  DELETE_TOURNAMENT_PHOTO,
  UPLOAD_TOURNAMENT_PHOTO
} from 'graphql/definitions/mutations';
import { GET_TOURNAMENT } from 'graphql/definitions/queries';
import { onError } from 'graphql/errorHandler';
import Spinner from 'components/Spinner';
import ImageWithBackup from 'components/ImageWithBackup';
import { Tournament } from 'types/types';

interface ITournamentPictureEditorProps {
  tournament: Tournament;
}

const TournamentPictureEditor = ({
  tournament
}: ITournamentPictureEditorProps): JSX.Element => {
  const [localFile, setLocalFile] = useState<Nullable<File>>(null);
  const [scale, setScale] = useState<number>(15);
  const inputFile = useRef<HTMLInputElement>(null);
  const editor = useRef<AvatarEditor>(null);

  const [uploadTournamentPhoto, { loading: uploadLoading }] = useMutation(
    UPLOAD_TOURNAMENT_PHOTO,
    {
      refetchQueries: [GET_TOURNAMENT],
      onError
    }
  );

  const [deleteTournamentPhoto, { loading: deleteLoading }] = useMutation(
    DELETE_TOURNAMENT_PHOTO,
    {
      refetchQueries: [GET_TOURNAMENT],
      onError
    }
  );

  const ref = useRef<HTMLInputElement>(null);

  const width = ref.current?.offsetWidth || 0;
  const height = width / 2.2;

  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      className={'dashed'}
      sx={{
        maxHeight: '364px',
        minWidth: '100%',
        padding: '16px',
        width: 'min-content',
        margin: '8px auto 16px'
      }}
      ref={ref}
    >
      {uploadLoading || deleteLoading ? (
        <Spinner />
      ) : (
        <Box width={'100%'}>
          <Box display={'flex'} justifyContent={'center'} mb={2}>
            {localFile ? (
              <AvatarEditor
                ref={editor}
                image={localFile}
                width={width * 0.75}
                height={height * 0.75}
                border={20}
                color={[0, 0, 0, 0.5]}
                scale={0.9 + scale / 50}
              />
            ) : (
              <ImageWithBackup image={tournament.photo} />
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
                  editor.current?.getImage().toBlob((blob) => {
                    void uploadTournamentPhoto({
                      variables: {
                        tournamentId: tournament._id,
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
            {!localFile && tournament.photo && (
              <Box ml={2}>
                <Button
                  size={'middle'}
                  type="primary"
                  onClick={(): void =>
                    void deleteTournamentPhoto({
                      variables: {
                        tournamentId: tournament._id
                      }
                    })
                  }
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

export default TournamentPictureEditor;
