import React from 'react';
import { Box } from '@mui/material/';

const PersonalStats = (): JSX.Element => {
  return (
    <Box pt={2} px={1}>
      <Box>Graph</Box>

      <Box>Your rating</Box>
      <Box>Rating</Box>
      <Box>Progression over the last 12 games</Box>
      <Box>Percentile</Box>

      <Box>Rating stats</Box>
      <Box>Average opponent</Box>
      <Box>Highest rating</Box>
      <Box>Lowest rating</Box>

      <Box>Games</Box>
      <Box>Wins</Box>
      <Box>Draws</Box>
      <Box>Losses</Box>
      <Box>Winrate with white</Box>
      <Box>Winrate with black</Box>
    </Box>
  );
};

export default PersonalStats;
