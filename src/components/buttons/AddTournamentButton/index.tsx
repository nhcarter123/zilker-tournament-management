import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { Button, Modal } from 'antd';
import AddTournamentForm from 'components/forms/AddTournamentForm';

// todo move to other folder
const useStyles = makeStyles({
  root: {
    marginRight: '8px'
  }
});

const AddTournamentButton = (): JSX.Element => {
  const classes = useStyles();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (): void => setIsModalVisible(true);
  const handleCancel = (): void => setIsModalVisible(false);

  return (
    <>
      <Button className={classes.root} type="primary" onClick={showModal}>
        Add Tournament
      </Button>
      <Modal
        title="Add Tournament"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <AddTournamentForm />
      </Modal>
    </>
  );
};

export default AddTournamentButton;
