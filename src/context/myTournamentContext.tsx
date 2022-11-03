import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useState
} from 'react';
import { Tournament } from 'types/types';
import { matchPath, useLocation } from 'react-router-dom';
import { Page } from 'types/page';
import { useQueryWithReconnect } from 'hooks/useQueryWithReconnect';
import { GET_TOURNAMENT } from 'graphql/definitions/queries';

interface IMyTournamentContext {
  tournamentId: Nullable<string>;
  myTournamentId: Nullable<string>;
  setMyTournamentId: Dispatch<SetStateAction<Nullable<string>>>;
  currentTournament: Nullable<Tournament>;
  currentTournamentLoading: boolean;
  exitTournament: () => void;
}

export const MyTournamentContext = createContext<IMyTournamentContext>({
  tournamentId: null,
  myTournamentId: null,
  setMyTournamentId: () => null,
  currentTournament: null,
  currentTournamentLoading: false,
  exitTournament: () => null
});

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

  const page = useLocation().pathname;
  const match = matchPath<{ tournamentId?: string }>(page, {
    path: Page.Tournament,
    exact: false,
    strict: false
  });
  const idFromRoute = match?.params.tournamentId || null;
  const tournamentId = idFromRoute || myTournamentId;

  const { data, loading: currentTournamentLoading } = useQueryWithReconnect<
    {
      getTournament: Nullable<Tournament>;
    },
    { tournamentId: string }
  >(GET_TOURNAMENT, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    ...(tournamentId ? { variables: { tournamentId } } : { skip: true })
  });

  const currentTournament = data?.getTournament || null;

  return (
    <MyTournamentContext.Provider
      value={{
        tournamentId,
        myTournamentId,
        setMyTournamentId,
        currentTournament,
        currentTournamentLoading,
        exitTournament
      }}
    >
      {children}
    </MyTournamentContext.Provider>
  );
};

export default MyTournamentContextProvider;
