import { useMutation, useQuery } from 'react-query';
import client from '../utils/client';
import { TMutationOptions, TQueryOptions } from '../types/client';

export const postAdmin = (mutationOpt?: TMutationOptions) => {
  const { isLoading, isError, mutate } = useMutation(
    async (importBody: any) => {
      const options = {
        method: 'POST',
        body: importBody,
      };

      const fetch = client('/userService/admin/createAdmin', options);
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

export const postPatient = (mutationOpt?: TMutationOptions) => {
  const { isLoading, isError, mutate } = useMutation(
    async (importBody: any) => {
      const options = {
        method: 'POST',
        body: importBody,
      };

      const fetch = client('/userService/patient/createPatient', options);
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

export const postDoctor = (mutationOpt?: TMutationOptions) => {
  const { isLoading, isError, mutate } = useMutation(
    async (importBody: any) => {
      const options = {
        method: 'POST',
        body: importBody,
      };

      const fetch = client('/userService/doctor/createDoctor', options);
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

export const postMedicalRecord = (mutationOpt?: TMutationOptions) => {
  const { isLoading, isError, mutate } = useMutation(
    async (importBody: any) => {
      const options = {
        method: 'POST',
        body: importBody,
      };

      const fetch = client(
        '/medicalRecordService/medicalRecord/createMedicalRecord',
        options
      );
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

export const getAdmin = (queryOptions?: TQueryOptions, govId?: string) => {
  const { data, isLoading, isError, refetch, isFetching } = useQuery(
    [`getAdmin${govId ? `/${govId}` : ''}`],
    client(`/userService/admin/getAdmin/${govId ? `${govId}` : ''}`),
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

export const getPatient = (queryOptions?: TQueryOptions, govId?: string) => {
  const { data, isLoading, isError, refetch, isFetching } = useQuery(
    [`getPatient${govId ? `/${govId}` : ''}`],
    client(`/userService/patient/getPatient/${govId ? `${govId}` : ''}`),
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

export const getDoctor = (queryOptions?: TQueryOptions, govId?: string) => {
  const { data, isLoading, isError, refetch, isFetching } = useQuery(
    [`getDoctor${govId ? `/${govId}` : ''}`],
    client(`/userService/doctor/getDoctor/${govId ? `${govId}` : ''}`),
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

export const getMedicalRecord = (
  queryOptions?: TQueryOptions,
  fetchOption?: any
) => {
  const { data, isLoading, isError, refetch, isFetching } = useQuery(
    ['getMedicalRecord'],
    client('/medicalRecordService/medicalRecord', fetchOption),
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
