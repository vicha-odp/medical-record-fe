import { useMutation, useQuery } from 'react-query';
import client from '../utils/client';
import { TMutationOptions, TQueryOptions } from '../types/client';

export const postPatientBlockchain = (mutationOpt?: TMutationOptions) => {
  const { isLoading, isError, mutate } = useMutation(
    async (importBody: any) => {
      const options = {
        method: 'POST',
        body: importBody,
      };

      const fetch = client('/api/v1/transaction', options);
      return fetch();
    },
    mutationOpt
  );

  return {
    isLoading,
    isError,
    mutate,
  };
};

export const postDoctorBlockchain = (mutationOpt?: TMutationOptions) => {
  const { isLoading, isError, mutate } = useMutation(
    async (importBody: any) => {
      const options = {
        method: 'POST',
        body: importBody,
      };

      const fetch = client('/api/v1/transaction', options);
      return fetch();
    },
    mutationOpt
  );

  return {
    isLoading,
    isError,
    mutate,
  };
};

export const postMedicalRecordBlockchain = (mutationOpt?: TMutationOptions) => {
  const { isLoading, isError, mutate } = useMutation(
    async (importBody: any) => {
      const options = {
        method: 'POST',
        body: importBody,
      };

      const fetch = client('/api/v1/transaction', options);
      return fetch();
    },
    mutationOpt
  );

  return {
    isLoading,
    isError,
    mutate,
  };
};

export const getPatientBlockchain = (queryOptions?: TQueryOptions) => {
  const { data, isLoading, isError, refetch, isFetching } = useQuery(
    ['getPatientBlockchain'],
    client('/api/v1/event/past'),
    queryOptions
  );

  return {
    data,
    isLoading,
    isError,
    refetch,
    isFetching,
  };
};

export const getDoctorBlockchain = (queryOptions?: TQueryOptions) => {
  const { data, isLoading, isError, refetch, isFetching } = useQuery(
    ['getDoctorBlockchain'],
    client('/api/v1/event/past'),
    queryOptions
  );

  return {
    data,
    isLoading,
    isError,
    refetch,
    isFetching,
  };
};

export const getMedicalRecordBlockchain = (queryOptions?: TQueryOptions) => {
  const { data, isLoading, isError, refetch, isFetching } = useQuery(
    ['getMedicalRecordBlockchain'],
    client('/api/v1/event/past'),
    queryOptions
  );

  return {
    data,
    isLoading,
    isError,
    refetch,
    isFetching,
  };
};
