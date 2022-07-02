import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  boardNumber: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '55px',
    left: '151px',
    background: 'white',
    padding: '0 8px',
    border: '4px solid #bfbfbf',
    borderRadius: '4px'
  },
  scoreNumber: {
    position: 'absolute',
    left: '-45px',
    border: '4px solid #bfbfbf',
    borderRadius: '4px',
    minWidth: '36px',
    textAlign: 'center',
    padding: '2px'
  },
  whiteScore: {
    top: '-4px'
  },
  blackScore: {
    bottom: '-4px'
  }
});
