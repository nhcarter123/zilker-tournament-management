import React, { useContext } from 'react';
import { UserContext } from 'context/userContext';
import { Box, Typography } from '@mui/material';
import { Button } from 'antd';
import Input from 'antd/lib/input';
import { debounce } from 'lodash';
import { useMutation } from '@apollo/client';
import { onError } from 'graphql/errorHandler';
import { CREATE_ORGANIZATION } from 'graphql/definitions/mutations';
import { GET_ME, GET_ORGANIZATION } from 'graphql/definitions/queries';
import { useQueryWithReconnect } from 'hooks/useQueryWithReconnect';
import { Organization } from 'types/types';

const OrganizationEditor = (): JSX.Element => {
  const me = useContext(UserContext);

  const { data } = useQueryWithReconnect<{
    getOrganization: Maybe<Organization>;
  }>(GET_ORGANIZATION, {
    variables: {
      organizationId: me?.organizationId || ''
    },
    skip: !me?.organizationId
  });

  const [createOrganization, { loading: createOrganizationLoading }] =
    useMutation(CREATE_ORGANIZATION, {
      refetchQueries: [GET_ME],
      awaitRefetchQueries: true,
      onError
    });

  return (
    <Box>
      <Typography variant={'h5'} mt={3}>
        Organization
      </Typography>
      <Typography variant={'body2'}>
        Organizations allow you to host tournaments of your own!
        {!me?.organizationId ? ' Create one to get started.' : ''}
      </Typography>
      {!me?.organizationId && (
        <Box mt={2}>
          <Button
            size={'middle'}
            type="primary"
            loading={createOrganizationLoading}
            onClick={() => createOrganization()}
            block
          >
            Create
          </Button>
        </Box>
      )}
      {data?.getOrganization?.name && (
        <Box mt={2}>
          <Input
            defaultValue={data?.getOrganization?.name}
            // onChange={debounce(handleTournamentNameChange, 1000)}
          />
        </Box>
      )}
      <Box mt={6}>ㅤ</Box> {/*// give some space at the bottom*/}
    </Box>
  );
};

export default OrganizationEditor;
