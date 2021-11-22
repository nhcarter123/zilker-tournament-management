import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  root: {
    paddingLeft: '8px',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  },
  noWrap: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  }
});
