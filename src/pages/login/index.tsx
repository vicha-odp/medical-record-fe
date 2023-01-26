import { getPatient } from '../../services/express';
import React from 'react';

const Login: React.FC = () => {
  const { data: getPatientData, isFetching: getPatientIsLoading } =
    getPatient();

  console.log(getPatientData);

  return <div className="w-full flex items-center justify-center">Login</div>;
};

export default Login;
