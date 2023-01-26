import React, { useMemo, useState } from 'react';
import Container from '../../components/Container';
import clsx from 'clsx';
import Text from '../../components/Text/Text';
import { getAdmin, getDoctor, getPatient } from '../../services/express';
import LoginStore from '../../store/login';
import { shallow } from 'zustand/shallow';
import Input from '../../components/Input';
import { defaultloginParams, TOptionSelected } from '../../types/login';

const OptionChild: React.FC<{
  id: number;
  title: TOptionSelected['title'];
}> = ({ id, title }) => {
  const { optionSelected, setOptionSelected, setLoginParams } =
    LoginStore.useLoginStore(
      (state) => ({
        optionSelected: state.optionSelected,
        setOptionSelected: state.setOptionSelected,
        setLoginParams: state.setLoginParams,
      }),
      shallow
    );

  const onClick = () => {
    setOptionSelected({ id, title });
    setLoginParams(defaultloginParams);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      className={clsx(
        'flex items-center justify-center',
        'bg-sky-100 transition-all',
        'px-2.5 py-2',
        'rounded-lg',
        optionSelected.title === title && 'bg-sky-400'
      )}
    >
      <Text value={title} className={clsx('text-xl font-medium')} />
    </div>
  );
};

const OptionLogin: React.FC = () => {
  const OPTIONS = [
    { id: 1, title: 'Admin' },
    { id: 2, title: 'Patient' },
    { id: 3, title: 'Doctor' },
  ];

  return (
    <div
      className={clsx(
        'w-[300px]',
        'flex gap-[10px] items-center justify-center'
      )}
    >
      {OPTIONS.map((option: any) => (
        <OptionChild key={option.id} id={option.id} title={option.title} />
      ))}
    </div>
  );
};

const Login: React.FC = () => {
  const [error, setError] = useState<string>('');
  const { loginParams, optionSelected, setLoginParams } =
    LoginStore.useLoginStore(
      (state) => ({
        loginParams: state.loginParams,
        optionSelected: state.optionSelected,
        setLoginParams: state.setLoginParams,
      }),
      shallow
    );
  const { setIsAuthenticated, authData, setAuthData } =
    LoginStore.useLoginPersistStore(
      (state) => ({
        authData: state.authData,
        setIsAuthenticated: state.setIsAuthenticated,
        setAuthData: state.setAuthData,
      }),
      shallow
    );

  const { data: admin } = getAdmin({}, loginParams.govId);
  const { data: patient } = getPatient({}, loginParams.govId);
  const { data: doctor } = getDoctor({}, loginParams.govId);

  const adminData = useMemo(() => {
    const data = admin?.data?.data;
    return data ? data : null;
  }, [admin]);

  const patientData = useMemo(() => {
    const data = admin?.data?.data;
    return data ? data : null;
  }, [patient]);

  const doctorData = useMemo(() => {
    const data = admin?.data?.data;
    return data ? data : null;
  }, [doctor]);

  const onChange = (e: any) => {
    const { name, value } = e.target;

    setLoginParams({
      ...loginParams,
      [name]: value,
      role: optionSelected.title,
    });
  };

  const onSubmit = () => {
    if (loginParams.role === 'Admin' && admin.data.code === 200) {
      if (loginParams.password === adminData?.password) {
        console.log('authenticated');
        setIsAuthenticated(true);
        setAuthData({
          ...authData,
          role: adminData?.role,
          govId: adminData?.govId,
          name: adminData?.name,
          email: adminData?.email,
          password: adminData?.password,
        });
        setError('');
      } else {
        setError('Password salah');
      }
    } else if (loginParams.role === 'Patient' && patient.data.code === 200) {
      if (loginParams.password === patientData?.password) {
        console.log('authenticated');
        setIsAuthenticated(true);
        setAuthData({
          ...authData,
          role: patientData?.role,
          govId: patientData?.govId,
          name: patientData?.name,
          email: patientData?.email,
          password: patientData?.password,
        });
        setError('');
      } else {
        setError('Password salah');
      }
    } else if (loginParams.role === 'Doctor' && doctor.data.code === 200) {
      if (loginParams.password === doctorData?.password) {
        console.log('authenticated');
        setIsAuthenticated(true);
        setAuthData({
          ...authData,
          role: doctorData?.role,
          govId: doctorData?.govId,
          name: doctorData?.name,
          email: doctorData?.email,
          password: doctorData?.password,
        });
        setError('');
      } else {
        setError('Password salah');
      }
    } else {
      setError('NIK atau Password salah');
    }
  };

  return (
    <div className="w-full flex justify-center">
      <Container className="h-screen">
        <div
          className={clsx(
            'w-full h-full',
            'flex flex-col items-center justify-center gap-[36px]'
          )}
        >
          <OptionLogin />
          <Text
            value={`Login ${optionSelected.title}`}
            className={clsx('text-3xl font-bold text-center')}
          />
          <div className="flex flex-col gap-[40px]">
            <Input
              label="NIK"
              id="govId"
              name="govId"
              value={loginParams.govId}
              onChange={onChange}
              containerClassName="flex flex-col gap-[20px]"
              inputClassName="p-3 border border-black rounded-lg"
            />
            <Input
              label="Password"
              id="password"
              name="password"
              type="password"
              value={loginParams.password}
              onChange={onChange}
              containerClassName="flex flex-col gap-[20px]"
              inputClassName="p-3 border border-black rounded-lg"
            />
            {error !== '' && (
              <Text
                value={error}
                className={clsx('text-sm text-red-500 font-bold text-center')}
              />
            )}
            <button
              onClick={onSubmit}
              className={clsx(
                'px-6 py-3 w-full rounded-lg bg-sky-500',
                (!loginParams.govId || !loginParams.password) && 'bg-gray-300'
              )}
              disabled={!loginParams.govId || !loginParams.password}
            >
              Login
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
