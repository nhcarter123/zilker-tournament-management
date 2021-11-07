import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { Modal, Button } from 'antd';
import AddPlayerForm from 'components/forms/AddPlayerForm';

// todo move to other folder
const useStyles = makeStyles({
  root: {
    marginRight: '8px'
  }
});

const AddPlayerButton = (): JSX.Element => {
  const classes = useStyles();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (): void => setIsModalVisible(true);
  const handleCancel = (): void => setIsModalVisible(false);

  return (
    <div>
      <Button className={classes.root} type="primary" onClick={showModal}>
        Add Player
      </Button>

      <Modal
        title="Add Player"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <AddPlayerForm />
      </Modal>
    </div>
  );
};

export default AddPlayerButton;
