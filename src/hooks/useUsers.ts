import useSWR from 'swr';
import { GET_USERS } from '../graphql/users';
import { GQL_Fetcher } from '../lib/graphql-client';
import { User } from '../types/user';


export const useUsers = () => {
  const { data, error, isLoading, mutate } = useSWR<{ users: User[] }>(
    [GET_USERS],
    GQL_Fetcher
  );

  return {
    users: data?.users || [],
    isLoading,
    isError: error,
    refreshUsers: mutate,
  };
};