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

      const fetch = client('/bc/addPatient', options);
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

      const fetch = client('/bc/addDoctor', options);
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

      const fetch = client('/bc/addMedicalRecord', options);
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

export const getPatientBlockchain = (mutationOpt?: TMutationOptions) => {
  const { isLoading, isError, mutate } = useMutation(
    async (importBody: any) => {
      const options = {
        method: 'POST',
        body: importBody,
      };

      const fetch = client('/bc/getPatient', options);
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

export const getDoctorBlockchain = (mutationOpt?: TMutationOptions) => {
  const { isLoading, isError, mutate } = useMutation(
    async (importBody: any) => {
      const options = {
        method: 'POST',
        body: importBody,
      };

      const fetch = client('/bc/getDoctor', options);
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

export const getMedicalRecordBlockchain = (mutationOpt?: TMutationOptions) => {
  const { isLoading, isError, mutate } = useMutation(
    async (importBody: any) => {
      const options = {
        method: 'POST',
        body: importBody,
      };

      const fetch = client('/bc/getMedicalRecord', options);
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
