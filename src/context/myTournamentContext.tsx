import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useState
} from 'react';

export const MyTournamentContext = createContext<IMyTournamentContext>({
  myTournamentId: null,
  setMyTournamentId: () => null,
  exitTournament: () => null
});

interface IMyTournamentContext {
  myTournamentId: Nullable<string>;
  setMyTournamentId: Dispatch<SetStateAction<Nullable<string>>>;
  exitTournament: () => void;
}

interface MyTournamentContextProviderProps {
  children: React.ReactNode;
}

const MyTournamentContextProvider = ({
  children
}: MyTournamentContextProviderProps): JSX.Element => {
  const [myTournamentId, setMyTournamentId] = useState<Nullable<string>>(null);

  const exitTournament = useCallback(() => {
    setMyTournamentId(null);
  }, []);

  return (
    <MyTournamentContext.Provider
      value={{
        myTournamentId,
        setMyTournamentId,
        exitTournament
      }}
    >
      {children}
    </MyTournamentContext.Provider>
  );
};

export default MyTournamentContextProvider;
