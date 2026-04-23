import { gql } from 'graphql-request';
import { RESERVATION_FIELDS, BOOK_FIELDS, USER_FIELDS } from './fragments';

export const CREATE_RESERVATION = gql`
  ${RESERVATION_FIELDS}
  mutation CreateReservation($input: CreateReservationInput!) {
    createReservation(createReservationInput: $input) {
      ...ReservationFields
    }
  }
`;

export const GET_RESERVATIONS_BY_USER = gql`
  ${RESERVATION_FIELDS}
  ${BOOK_FIELDS}
  query GetReservationsByUser($userId: Int!, $startDate: DateTime, $endDate: DateTime) {
    reservationsByUser(userId: $userId, startDate: $startDate, endDate: $endDate) {
      ...ReservationFields
      book {
        ...BookFields
      }
    }
  }
`;

export const RETURN_BOOK = gql`
  ${BOOK_FIELDS}
  mutation ReturnBook($id: Int!) {
    returnBook(id: $id) {
      id
      dateReservation
      dateDevolucion
      returnedAt
      book {
        ...BookFields
      }
    }
  }
`;

export const GET_ACTIVE_RESERVATIONS = gql`
  ${BOOK_FIELDS}
  ${USER_FIELDS}
  ${RESERVATION_FIELDS}
  query GetActiveReservations {
    # Suponiendo que tu backend tiene este query o que puedes filtrar
    reservations { 
      ...ReservationFields
      book {
        ...BookFields
      }
      user {
        ...UserFields
      }
    }
  }
`;