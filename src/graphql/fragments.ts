import { gql } from 'graphql-request';

export const BOOK_FIELDS = gql`
  fragment BookFields on Book {
    id
    title
    author
    gender
    isAvailable
  }
`;

export const USER_FIELDS = gql`
  fragment UserFields on User {
    id
    name
    email
  }
`;

export const RESERVATION_FIELDS = gql`
  fragment ReservationFields on Reservation {
    id
    dateReservation
    dateDevolucion
    returnedAt
  }
`;