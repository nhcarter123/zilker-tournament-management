import { createContext, Dispatch, SetStateAction } from 'react';

export const LoginContext = createContext<{
  setToken: Dispatch<SetStateAction<string | null>>;
  refetchGetMe: Function;
}>({
  setToken: () => null,
  refetchGetMe: () => null
});
