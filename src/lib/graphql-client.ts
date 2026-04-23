import { GraphQLClient } from 'graphql-request';

const endpoint = process.env.NEXT_PUBLIC_API_URL;

if (!endpoint) {
  throw new Error('Falta la variable de entorno NEXT_PUBLIC_API_URL');
}

export const client = new GraphQLClient(endpoint);

export const GQL_Fetcher = ([query, variables]: [string, any?]) => 
  client.request(query, variables);