import { ApolloError } from '@apollo/client';
import { notification } from 'antd';

const openNotification = (message: string, description?: string) => {
  notification.open({
    message,
    description
  });
};

export const onError = (error: ApolloError): void => {
  const message = `⚠️ ${error.message}`;

  if (
    error.message.includes('Rate limit exceeded') ||
    error.message.includes('This email is already in use') ||
    error.message.includes('Incorrect email or password') ||
    error.message.includes('Unable to send text message') ||
    error.message.includes('Phone country not supported') ||
    error.message.includes('Invalid code') ||
    error.message.includes('Challenger is in another match') ||
    error.message.includes('Challenge not found') ||
    error.message.includes('Match not found')
  ) {
    openNotification(message);
  }

  console.log(error.message);
};
