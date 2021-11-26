import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  root: {
    border: '2px solid gold',
    borderRadius: '4px',
    padding: '0 4px'
  },
  crownContainer: {
    position: 'relative'
  },
  crown: {
    position: 'absolute',
    left: '-12px',
    transform: 'rotate(-22deg)',
    top: '-15px',
    color: 'gold',
    height: '20px',
    width: '20px'
  },
  crownHidden: {
    display: 'none'
  }
});
