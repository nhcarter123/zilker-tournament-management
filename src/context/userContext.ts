import { createContext } from 'react';
import { User } from '../types/types';

export const UserContext = createContext<Nullable<User>>(null);
