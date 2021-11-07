import React, { SetStateAction, Dispatch } from 'react';
import { makeStyles } from '@material-ui/core';
import { Input } from 'antd';

// todo move to other folder
const useStyles = makeStyles({
  root: {
    justifyContent: 'space-between',
    display: 'flex',
    position: 'sticky',
    top: '60px',
    marginTop: '40px',
    padding: '6px',
    background: '#ffffff',
    zIndex: 1
  },
  searchbar: {
    width: '404px'
  }
});

type TableSearchBarProps = {
  setFilterTerm: Dispatch<SetStateAction<string>>;
  renderButton: () => JSX.Element;
};

const TableSearchBar = (props: TableSearchBarProps): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {props.renderButton()}
      <Input.Group className={classes.searchbar}>
        <Input.Search
          allowClear
          onChange={(e): void =>
            props.setFilterTerm(e.target.value.toLowerCase())
          }
        />
      </Input.Group>
    </div>
  );
};

export default TableSearchBar;
