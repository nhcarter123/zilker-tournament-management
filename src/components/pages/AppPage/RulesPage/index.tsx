import React from 'react';
import { Box, Typography } from '@mui/material/';

interface RuleInput {
  title: string;
  description: string;
}

const rules = [
  {
    title: 'Respect 🤝',
    description:
      'Treat others with respect, even in defeat. This is the most important rule.'
  },
  {
    title: 'Clock move ⏰',
    description: `We play “clock move”, which means that your move is not complete until
          you press the button on the clock, thus you can change your move as
          much as you want, as long as you haven’t hit the clock yet. Once you
          hit the clock, your move is complete, and it’s your opponent’s turn.`
  },
  {
    title: 'Take kings 👑',
    description: `We play “take kings”, which means you don’t have to announce check, and
        if your opponent doesn’t notice that they’re in check and makes an
        illegal move, you can capture their king and claim the victory.`
  },
  {
    title: 'Single hand 🤏',
    description: `Use the same hand to hit the clock that you use to move your piece on each
        individual move.`
  }
];

const RulesPage = (): JSX.Element => {
  const renderRule = (
    { title, description }: RuleInput,
    index: number
  ): JSX.Element => {
    return (
      <Box mt={1} mb={2} mx={2} key={index}>
        <Typography variant={'h6'}>{title}</Typography>
        <Typography variant={'body1'}>{description}</Typography>
      </Box>
    );
  };

  return <Box>{rules.map((rule, index) => renderRule(rule, index))}</Box>;
};

export default RulesPage;
