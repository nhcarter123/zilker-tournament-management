import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: '10px',
    left: '88px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: 'grid'
  },
  noWrap: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  }
});
