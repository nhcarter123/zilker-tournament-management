import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  root: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  boardContainer: {
    display: 'flex',
    justifyContent: 'center',
    position: 'relative'
  },
  boardNumber: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '61px',
    left: '180px',
    background: 'white',
    padding: '0 8px',
    border: '4px solid #bfbfbf',
    borderRadius: '4px'
  }
});
