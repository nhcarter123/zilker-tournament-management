import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
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
    left: '193px',
    background: 'white',
    padding: '0 8px',
    border: '4px solid #bfbfbf',
    borderRadius: '4px'
  }
});
