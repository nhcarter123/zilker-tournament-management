import React from 'react';
import { Box } from '@mui/material/';

const maxDataAge = 86400;
const graphHeight = 300;
const graphStyle = {
  zIndex: 1,
  background: '#FFFFFF',
  border: 'none',
  borderRadius: '2px',
  boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
  'pointer-events': 'none'
};

const GlobalStats = (): JSX.Element => {
  return (
    <Box
      pt={2}
      px={1}
      // width={'100%'}
      // sx={{
      //   maxWidth: '1000px'
      // }}
    >
      <iframe
        style={graphStyle}
        width={'100%'}
        height={graphHeight}
        src={`https://charts.mongodb.com/charts-zilkerdb-dnjqk/embed/charts?id=8344db29-fb37-486d-9aff-0e75ed2a5002&maxDataAge=${maxDataAge}&theme=light&autoRefresh=true`}
      />
      <iframe
        style={graphStyle}
        width={'100%'}
        height={graphHeight}
        src={`https://charts.mongodb.com/charts-zilkerdb-dnjqk/embed/charts?id=7e43236c-0680-4c8b-ab1b-fe40d2c2766f&maxDataAge=${maxDataAge}&theme=light&autoRefresh=true`}
      />

      <iframe
        style={graphStyle}
        width={'100%'}
        height={graphHeight}
        src={`https://charts.mongodb.com/charts-zilkerdb-dnjqk/embed/charts?id=84463e25-4e83-4cc9-bddb-f6e0b2d95825&maxDataAge=${maxDataAge}&theme=light&autoRefresh=true`}
      />

      <Box display={'flex'} justifyContent={'space-between'}>
        <Box mr={1} width={'100%'}>
          <iframe
            style={graphStyle}
            width={'100%'}
            height={graphHeight / 2}
            src={`https://charts.mongodb.com/charts-zilkerdb-dnjqk/embed/charts?id=ff80b699-141c-448f-9271-52d95217787a&maxDataAge=${maxDataAge}&theme=light&autoRefresh=true`}
          />
        </Box>
        <Box width={'100%'}>
          <iframe
            style={graphStyle}
            width={'100%'}
            height={graphHeight / 2}
            src={`https://charts.mongodb.com/charts-zilkerdb-dnjqk/embed/charts?id=da2f71d1-7085-468e-baf4-42a165ce57d7&maxDataAge=${maxDataAge}&theme=light&autoRefresh=true`}
          />
        </Box>
      </Box>

      <iframe
        style={graphStyle}
        width={'100%'}
        height={graphHeight}
        src={`https://charts.mongodb.com/charts-zilkerdb-dnjqk/embed/charts?id=5d5e1c08-0970-4f97-812e-6fc1040bb70b&maxDataAge=${maxDataAge}&theme=light&autoRefresh=true`}
      />

      <iframe
        style={graphStyle}
        width={'100%'}
        height={graphHeight}
        src={`https://charts.mongodb.com/charts-zilkerdb-dnjqk/embed/charts?id=78ee3e92-7450-4eca-8a7a-eb32ae001a21&maxDataAge=${maxDataAge}&theme=light&autoRefresh=true`}
      />

      <Box display={'flex'} justifyContent={'space-between'}>
        <Box mr={1} width={'100%'}>
          <iframe
            style={graphStyle}
            width={'100%'}
            height={graphHeight / 2}
            src={`https://charts.mongodb.com/charts-zilkerdb-dnjqk/embed/charts?id=55b3ee0e-213f-482b-8c89-62e3668a93c3&maxDataAge=${maxDataAge}&theme=light&autoRefresh=true`}
          />
        </Box>
        <Box width={'100%'}>
          <iframe
            style={graphStyle}
            width={'100%'}
            height={graphHeight / 2}
            src={`https://charts.mongodb.com/charts-zilkerdb-dnjqk/embed/charts?id=baeb63ef-0209-4dee-8ebc-0a949eb0252d&maxDataAge=${maxDataAge}&theme=light&autoRefresh=true`}
          />
        </Box>
      </Box>

      <iframe
        style={graphStyle}
        width={'100%'}
        height={graphHeight}
        src={`https://charts.mongodb.com/charts-zilkerdb-dnjqk/embed/charts?id=28348fe6-e794-4569-9ab0-8d38978dd98a&maxDataAge=${maxDataAge}&theme=light&autoRefresh=true`}
      />

      <iframe
        style={graphStyle}
        width={'100%'}
        height={graphHeight}
        src={`https://charts.mongodb.com/charts-zilkerdb-dnjqk/embed/charts?id=5f4c803f-adb6-4341-bcc4-7e127a871e38&maxDataAge=${maxDataAge}&theme=light&autoRefresh=true`}
      />

      <iframe
        style={graphStyle}
        width={'100%'}
        height={graphHeight}
        src={`https://charts.mongodb.com/charts-zilkerdb-dnjqk/embed/charts?id=2b40212c-a595-4043-bcb6-baa7c3ddd6ae&maxDataAge=${maxDataAge}&theme=light&autoRefresh=true`}
      />

      <iframe
        style={graphStyle}
        width={'100%'}
        height={graphHeight}
        src={`https://charts.mongodb.com/charts-zilkerdb-dnjqk/embed/charts?id=f620a4d5-1879-4158-995f-c98ea9eccf52&maxDataAge=${maxDataAge}&theme=light&autoRefresh=true`}
      />
    </Box>
  );
};

export default GlobalStats;
