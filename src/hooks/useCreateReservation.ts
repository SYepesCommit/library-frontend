import useSWRMutation from 'swr/mutation';
import { client } from '../lib/graphql-client';
import { CREATE_RESERVATION } from '../graphql/reservations';


async function createReservationRequest(url: string, { arg }: { arg: any }) {
  return client.request(CREATE_RESERVATION, { input: arg });
}

export const useCreateReservation = () => {
  const { trigger, isMutating, error } = useSWRMutation('createReservation', createReservationRequest);

  return {
    createReservation: trigger,
    isSubmitting: isMutating,
    error
  };
};