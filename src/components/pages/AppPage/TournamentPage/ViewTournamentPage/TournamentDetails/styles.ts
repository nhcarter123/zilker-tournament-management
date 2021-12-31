import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  root: {
    width: '100%',
    '& .ant-radio-button-wrapper': {
      width: '33.3333%',
      textAlign: 'center'
    }
  }
});
