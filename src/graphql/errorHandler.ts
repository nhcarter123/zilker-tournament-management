import { ApolloError } from "@apollo/client";
import { notification } from "antd";

export const openNotification = (message: string, description?: string): void => notification.open({
  message,
  description
});


export const onError = (error: ApolloError): void => {
  const message = `⚠️ ${error.message}`;

  if (
    error.message.includes("Rate limit exceeded") ||
    error.message.includes("This email is already in use") ||
    error.message.includes("Incorrect email or password") ||
    error.message.includes("Unable to send text message") ||
    error.message.includes("Phone country not supported") ||
    error.message.includes("Invalid code") ||
    error.message.includes("Player in another challenge") ||
    error.message.includes("Challenge not found") ||
    error.message.includes("Invalid opponent") ||
    error.message.includes("Match not found")
  ) {
    openNotification(message);
  }

  console.log(error.message);
};
