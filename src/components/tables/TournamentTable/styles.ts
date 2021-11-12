import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  root: { maxWidth: '1000px', margin: 'auto' },
  table: {
    '& .ant-table-sticky-holder': {
      top: '104px !important'
    }
  }
});
