import React, { SetStateAction, Dispatch } from 'react';
import { Input } from 'antd';
import { useStyles } from 'components/TableSearchBar/styles';

type TableSearchBarProps = {
  setFilterTerm: Dispatch<SetStateAction<string>>;
  renderButton: () => JSX.Element;
};

const TableSearchBar = (props: TableSearchBarProps): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {props.renderButton()}
      <Input.Group className={classes.searchbar} size={'large'}>
        <Input.Search
          size={'large'}
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
