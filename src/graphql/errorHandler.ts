import { ApolloError } from '@apollo/client';
import { notification } from 'antd';

const openNotification = (message: string, description?: string) => {
  notification.open({
    message,
    description
  });
};

export const onError = (error: ApolloError): void => {
  if (error.message.includes('Rate limit exceeded')) {
    openNotification('⚠️️ Rate limit exceeded️');
  } else if (error.message.includes('This email is already in use')) {
    openNotification('⚠️ This email is already in use');
  } else if (error.message.includes('Incorrect email or password')) {
    openNotification('⚠️ Incorrect email or password');
  } else if (error.message.includes('Unable to send text message')) {
    openNotification('⚠️ Unable to send text message');
  }

  console.log(error);
};
