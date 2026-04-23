import { gql } from 'graphql-request';
import { BOOK_FIELDS } from './fragments';

export const GET_BOOKS = gql`
  ${BOOK_FIELDS}
  query GetBooks {
    books {
      ...BookFields
    }
  }
`;

export const CREATE_BOOK = gql`
  ${BOOK_FIELDS}
  mutation CreateBook($input: CreateBookInput!) {
    createBook(createBookInput: $input) {
      ...BookFields
    }
  }
`;

export const UPDATE_BOOK = gql`
  ${BOOK_FIELDS}
  mutation UpdateBook($input: UpdateBookInput!) {
    updateBook(updateBookInput: $input) {
      ...BookFields
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation RemoveBook($id: Int!) {
    removeBook(id: $id) {
      id
    }
  }
`;