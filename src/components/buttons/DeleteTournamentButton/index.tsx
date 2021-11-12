import React from 'react';
import { Button, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

type DeletePlayerButtonProps = {
  _id: string;
};

const DeletePlayerButton = ({ _id }: DeletePlayerButtonProps): JSX.Element => {
  return (
    <Popconfirm title="Are you sure?" onConfirm={(): void => console.log(_id)}>
      <Button type="primary" shape="circle" icon={<DeleteOutlined />} />
    </Popconfirm>
  );
};

export default DeletePlayerButton;
