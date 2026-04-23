import { gql } from 'graphql-request';
import { USER_FIELDS } from './fragments';

export const GET_USERS = gql`
  ${USER_FIELDS}
  query GetUsers {
    users {
      ...UserFields
    }
  }
`;

export const CREATE_USER = gql`
  ${USER_FIELDS}
  mutation CreateUser($input: CreateUserInput!) {
    createUser(createUserInput: $input) {
      ...UserFields
    }
  }
`;