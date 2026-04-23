import useSWR from 'swr';
import { Book } from '../types/book';   
import { GET_BOOKS } from '../graphql/books';
import { GQL_Fetcher } from '../lib/graphql-client';

export const useBooks = () => {
  const { data, error, isLoading, mutate } = useSWR<{ books: Book[] }>(
    [GET_BOOKS],
    GQL_Fetcher
  );

  return {
    books: data?.books || [],
    isLoading,
    isError: error,
    refreshBooks: mutate,
  };
};