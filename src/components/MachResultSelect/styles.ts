import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  container: {
    height: '120px'
  },
  wideDraw: {
    '& .ant-radio-button-wrapper:first-child': {
      width: '90px',
      textAlign: 'center'
    }
  }
});
