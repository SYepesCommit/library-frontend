import useSWR from 'swr';
import { client } from '../lib/graphql-client';
import { GET_RESERVATIONS_BY_USER } from '../graphql/reservations';
import { Reservation } from '../types/reservation';

export const useUserReservations = (userId?: number) => {
  const fetcher = ({ query, variables }: any) => client.request(query, variables);

  const { data, error, isLoading, mutate } = useSWR(
    userId ? { query: GET_RESERVATIONS_BY_USER, variables: { userId } } : null,
    fetcher
  );

  const reservations = data?.reservationsByUser || [];

  return {
    activeReservations: reservations.filter((r: Reservation) => !r.returnedAt),
    allReservations: reservations,
    isLoading,
    isError: error,
    refreshReservations: mutate,
  };
};