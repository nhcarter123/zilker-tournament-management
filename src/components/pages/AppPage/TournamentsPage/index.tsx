import React, {
  SyntheticEvent,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import { Box, Tab, Tabs } from '@mui/material';
import JoinTournamentList from 'components/pages/AppPage/TournamentsPage/JoinTournamentList';
import Spinner from 'components/Spinner';
import AddTournamentButton from 'components/buttons/AddTournamentButton';
import CreateGameButton from 'components/buttons/CreateGameButton';

import SwipeableViews from 'react-swipeable-views';

import { GET_TOURNAMENTS } from 'graphql/definitions/queries';
import { TOURNAMENT_UPDATED } from 'graphql/definitions/subscriptions';
import { JOIN_TOURNAMENT } from 'graphql/definitions/mutations';

import { useQueryWithReconnect } from 'hooks/useQueryWithReconnect';
import { useMutation, useSubscription } from '@apollo/client';
import { onError } from 'graphql/errorHandler';

import {
  MatchResult,
  Role,
  TournamentStatus,
  TournamentUpdatedData,
  TournamentUpdatedVariables,
  TournamentWithOrganization,
  User
} from 'types/types';
import { Page } from 'types/page';
import { UserContext } from 'context/userContext';
import MatchPage from 'components/pages/AppPage/TournamentPage/PlayPage/MatchPage';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { THEME_PRIMARY } from 'constants/constants';
import { Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

const TournamentsPage = (): JSX.Element => {
  const history = useHistory();
  const me = useContext(UserContext);

  const queryParams = useMemo(
    () => new URLSearchParams(window.location.search),
    []
  );

  const [joinTournament, { loading: joinLoading }] = useMutation<{
    joinTournament?: { tournamentId: string };
  }>(JOIN_TOURNAMENT, {
    onError,
    onCompleted: (data) => {
      const tournamentId = data.joinTournament?.tournamentId;

      if (tournamentId) {
        history.push(
          Page.Tournament.replace(':tournamentId', tournamentId) +
            history.location.search
        );
      }
    }
  });

  useEffect(() => {
    const organizationId = queryParams.get('join');
    const tournamentId = queryParams.get('tournamentId');

    if (organizationId) {
      queryParams.delete('join');
      queryParams.delete('tournamentId');
      history.replace({
        search: queryParams.toString()
      });

      void joinTournament({
        variables: {
          organizationId,
          tournamentId
        }
      });
    }
  }, [queryParams, joinLoading, history, joinTournament]);

  const { data, loading } = useQueryWithReconnect<{
    getTournaments: TournamentWithOrganization[];
  }>(GET_TOURNAMENTS, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first'
  });

  useSubscription<TournamentUpdatedData, TournamentUpdatedVariables>(
    TOURNAMENT_UPDATED,
    {
      ...(data?.getTournaments
        ? {
            variables: {
              tournamentIds: data.getTournaments.map(
                (tournament) => tournament._id
              )
            }
          }
        : { skip: true })
    }
  );

  const tournaments = [...(data?.getTournaments || [])].sort(
    (a, b) => moment(b.date).valueOf() - moment(a.date).valueOf()
  );

  const activeTournaments = tournaments.filter(
    (tournament) => tournament.status === TournamentStatus.Active
  );
  const scheduledTournaments = tournaments.filter(
    (tournament) => tournament.status === TournamentStatus.Created
  );
  const completedTournaments = tournaments.filter(
    (tournament) => tournament.status === TournamentStatus.Completed
  );

  const [currentTab, setCurrentTab] = useState<number>(
    activeTournaments.length > 0 ? 0 : 1
  );

  useEffect(() => {
    setCurrentTab(activeTournaments.length > 0 ? 0 : 1);
  }, [setCurrentTab, activeTournaments.length]);

  const handleChangeIndex = (index: number) => setCurrentTab(index);

  return joinLoading || (loading && !data) ? (
    <Spinner />
  ) : (
    <Box display={'flex'} justifyContent={'center'} height={'100%'}>
      <Box
        display={'grid'}
        gridTemplateRows={'auto 1fr'}
        width={'100%'}
        maxWidth={'600px'}
      >
        {/*<Box mx={2} display={'flex'} justifyContent={'center'}>*/}
        {/*{me?.organizationId && <AddTournamentButton />}*/}
        {/*<CreateGameButton />*/}
        {/*<AddTournamentButton />*/}
        {/*</Box>*/}

        <Box
          display={'flex'}
          justifyContent={'center'}
          boxShadow={
            'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.05) 0px 2px 6px 2px;'
          }
        >
          <Box>
            <Tabs
              value={currentTab}
              onChange={(event: SyntheticEvent, newValue: number) =>
                setCurrentTab(newValue)
              }
            >
              <Tab label={'Active'} />
              <Tab label={'Scheduled'} />
              <Tab label={'Past'} />
            </Tabs>
          </Box>
          {/*<Box*/}
          {/*  position={'absolute'}*/}
          {/*  left={15}*/}
          {/*  top={65}*/}
          {/*  // color={THEME_PRIMARY}*/}
          {/*  zIndex={2}*/}
          {/*>*/}
          {/*  <Button*/}
          {/*    type={'primary'}*/}
          {/*    size={'large'}*/}
          {/*    shape="circle"*/}
          {/*    onClick={() => {*/}
          {/*      console.log('');*/}
          {/*    }}*/}
          {/*    icon={<PlusCircleOutlined />}*/}
          {/*  />*/}
          {/*</Box>*/}
        </Box>

        <Box>
          <SwipeableViews
            index={currentTab}
            style={{ height: '100%' }}
            containerStyle={{
              height: '100%',
              WebkitOverflowScrolling: 'touch'
            }}
            onChangeIndex={handleChangeIndex}
          >
            <JoinTournamentList
              tournaments={activeTournaments}
              status={TournamentStatus.Active}
            />
            <JoinTournamentList
              tournaments={scheduledTournaments}
              status={TournamentStatus.Created}
            />
            <JoinTournamentList
              tournaments={completedTournaments}
              status={TournamentStatus.Completed}
            />
          </SwipeableViews>
        </Box>
      </Box>
    </Box>
  );
};

export default TournamentsPage;
