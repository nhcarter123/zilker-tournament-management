import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState
} from 'react';

export const MyTournamentContext = createContext<IMyTournamentContext>({
  myTournamentId: null,
  setMyTournamentId: () => null
});

interface IMyTournamentContext {
  myTournamentId: Nullable<string>;
  setMyTournamentId: Dispatch<SetStateAction<Nullable<string>>>;
}

interface MyTournamentContextProviderProps {
  children: React.ReactNode;
}

const MyTournamentContextProvider = ({
  children
}: MyTournamentContextProviderProps): JSX.Element => {
  const [myTournamentId, setMyTournamentId] = useState<Nullable<string>>(null);

  return (
    <MyTournamentContext.Provider value={{ myTournamentId, setMyTournamentId }}>
      {children}
    </MyTournamentContext.Provider>
  );
};

export default MyTournamentContextProvider;
