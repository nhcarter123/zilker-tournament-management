import React, { ReactNode } from 'react';
import { Box } from '@mui/material/';

interface IImageWithBackupProps {
  image?: string;
  children?: ReactNode;
}

const ImageWithBackup: React.FC<IImageWithBackupProps> = ({
  image,
  children
}): JSX.Element => {
  return (
    <Box
      sx={{
        background: 'center',
        boxShadow: 'rgb(99 99 99) 0px 2px 2px 0px',
        backgroundImage: 'url(/default-placeholder.jpg)',
        backgroundSize: 'cover',
        height: '100px',
        width: '100%'
      }}
    >
      {image && (
        <Box
          sx={{
            height: '100%',
            overflow: 'hidden'
          }}
        >
          <img
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
            src={image}
            alt={'image'}
          />
        </Box>
      )}
      {children}
    </Box>
  );
};

export default ImageWithBackup;
