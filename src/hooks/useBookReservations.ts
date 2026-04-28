import useSWR from 'swr';
import { client } from '../lib/graphql-client';
import { GET_BOOK_HISTORY } from '../graphql/books';

export const useBookReservations = (bookId?: number) => {
  const fetcher = ({ query, variables }: { query: string; variables: { bookId: number } }) => 
    client.request(query, variables);

  const { data, error, isLoading, mutate } = useSWR(
    bookId ? { query: GET_BOOK_HISTORY, variables: { bookId } } : null,
    fetcher
  );

  const reservations = data?.bookReservations || [];

  return {
    allReservations: reservations,
    isLoading,
    isError: error,
    refreshReservations: mutate,
  };
};