import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useState
} from 'react';
import { TournamentUpdateData } from '../types/types';

export const MyTournamentContext = createContext<IMyTournamentContext>({
  myTournamentId: null,
  setMyTournamentId: () => null,
  myTournamentSubData: null,
  setMyTournamentSubData: () => null,
  exitTournament: () => null
});

interface IMyTournamentContext {
  myTournamentId: Nullable<string>;
  setMyTournamentId: Dispatch<SetStateAction<Nullable<string>>>;
  myTournamentSubData: Nullable<TournamentUpdateData>;
  setMyTournamentSubData: Dispatch<
    SetStateAction<Nullable<TournamentUpdateData>>
  >;
  exitTournament: () => void;
}

interface MyTournamentContextProviderProps {
  children: React.ReactNode;
}

const MyTournamentContextProvider = ({
  children
}: MyTournamentContextProviderProps): JSX.Element => {
  const [myTournamentId, setMyTournamentId] = useState<Nullable<string>>(null);
  const [myTournamentSubData, setMyTournamentSubData] =
    useState<Nullable<TournamentUpdateData>>(null);

  const exitTournament = useCallback(() => {
    setMyTournamentId(null);
    setMyTournamentSubData(null);
  }, []);

  return (
    <MyTournamentContext.Provider
      value={{
        myTournamentId,
        setMyTournamentId,
        myTournamentSubData,
        setMyTournamentSubData,
        exitTournament
      }}
    >
      {children}
    </MyTournamentContext.Provider>
  );
};

export default MyTournamentContextProvider;
