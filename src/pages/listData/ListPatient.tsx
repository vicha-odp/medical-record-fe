import React, { useMemo, useState } from 'react';
import clsx from 'clsx';
import Text from '../../components/Text/Text';
import List from '../../components/List/List';
import Input from '../../components/Input';
import ChildList from '../../components/List/ChildList';
import { getPatient, postPatient } from '../../services/express';
import {
  getPatientBlockchain,
  postPatientBlockchain,
} from '../../services/blockchain';
import LoginStore from '../../store/login';
import { shallow } from 'zustand/shallow';

const SectionGetPatientBlockchain: React.FC = () => {
  const defaultStatus = {
    success: '',
    error: '',
  };

  const defaultDataPatient = {
    patName: '',
    patAddress: '',
    patAyah: '',
    patIbu: '',
  };

  const [dataPatient, setDataPatient] =
    useState<typeof defaultDataPatient>(defaultDataPatient);
  const [status, setStatus] = useState<typeof defaultStatus>(defaultStatus);
  const [patientParams, setPatientParams] =
    useState<TPatientParams['govId']>('');

  const { mutate: patientBlockchain, isLoading } = getPatientBlockchain({
    onSuccess(res) {
      setStatus({ ...status, success: 'Data ditemukan!' });

      setDataPatient(res.data);

      setTimeout(() => {
        setStatus(defaultStatus);
      }, 4000);
    },
    onError() {
      setStatus({ ...status, error: 'Data tidak ditemukan!' });

      setTimeout(() => {
        setStatus(defaultStatus);
      }, 4000);
    },
  });

  const onChange = (e: any) => {
    const { value } = e.target;

    setPatientParams(value);
  };

  const onSubmit = () => {
    patientBlockchain({ govId: patientParams });
  };

  return (
    <div className={clsx('my-[30px]')}>
      <Text
        value="Find Patient on Blockchain"
        className={clsx(
          'text-xl font-bold text-left text-neutral-700 mb-[20px]'
        )}
      />
      <div className="flex flex-col gap-[40px]">
        <Input
          label="NIK"
          id="govId"
          name="govId"
          value={patientParams}
          onChange={onChange}
          containerClassName="flex flex-col gap-[20px]"
          inputClassName="p-3 border border-black rounded-lg"
        />

        <div
          className={clsx(
            'w-full flex',
            status.error !== '' || status.success !== ''
              ? 'justify-between'
              : 'justify-end'
          )}
        >
          <div className="flex flex-col gap-[5px]">
            {status.success !== '' && (
              <Text
                value={status.success}
                className={clsx(
                  'text-sm font-semibold text-left text-green-500'
                )}
              />
            )}
            {status.error !== '' && (
              <Text
                value={status.error}
                className={clsx('text-sm font-semibold text-left text-red-500')}
              />
            )}
          </div>
          <button
            onClick={onSubmit}
            className={clsx(
              'px-6 py-3 rounded-lg bg-sky-500',
              !patientParams && 'bg-gray-300'
            )}
            disabled={!patientParams}
          >
            {isLoading ? 'Loading...' : 'Find Patient'}
          </button>
        </div>
      </div>
      <div>
        {dataPatient && (
          <div className="flex flex-col gap-[10px]">
            <Text
              value={dataPatient.patName}
              className={clsx('text-xl font-semibold text-left text-sky-500')}
            />
            <Text
              value={dataPatient.patAddress}
              className={clsx('text-xl font-normal text-left text-neutral-700')}
            />
            <Text
              value={dataPatient.patAyah}
              className={clsx('text-xl font-normal text-left text-neutral-700')}
            />
            <Text
              value={dataPatient.patIbu}
              className={clsx('text-xl font-normal text-left text-neutral-700')}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const SectionCreatePatient: React.FC = () => {
  const defaultPatientParams = {
    govId: '',
    name: '',
    email: '',
    password: '',
    patientAddress: '',
    mothersName: '',
    fathersName: '',
  };

  const defaultStatus = {
    success: '',
    error: '',
  };

  const [patientParams, setPatientParams] =
    useState<TPatientParams>(defaultPatientParams);
  const [status, setStatus] = useState<typeof defaultStatus>(defaultStatus);

  const { mutate: sendPatientBlockchain, isLoading: isLoadingBlockchain } =
    postPatientBlockchain({
      onSuccess() {
        setStatus({ ...status, success: 'Patient Successfully Created BC!' });

        setTimeout(() => {
          setStatus(defaultStatus);
        }, 4000);
      },
      onError() {
        setStatus({ ...status, success: 'Patient Failed Created! BC' });

        setTimeout(() => {
          setStatus(defaultStatus);
        }, 4000);
      },
    });
  const { mutate: sendPatientBackend, isLoading: isLoadingBackend } =
    postPatient({
      onSuccess() {
        setStatus({ ...status, success: 'Patient Successfully Created BE!' });

        setTimeout(() => {
          setStatus(defaultStatus);
        }, 4000);
      },
      onError() {
        setStatus({ ...status, success: 'Patient Failed Created BE!' });

        setTimeout(() => {
          setStatus(defaultStatus);
        }, 4000);
      },
    });

  const onChange = (e: any) => {
    const { name, value } = e.target;

    setPatientParams({
      ...patientParams,
      [name]: value,
    });
  };

  const onSubmit = () => {
    sendPatientBackend({
      govId: patientParams.govId,
      email: patientParams.email,
      name: patientParams.name,
      password: patientParams.password,
    });

    sendPatientBlockchain({
      govId: patientParams.govId,
      name: patientParams.name,
      patientAddress: patientParams.patientAddress,
      mothersName: patientParams.mothersName,
      fathersName: patientParams.fathersName,
    });
  };

  return (
    <div className={clsx('my-[30px]')}>
      <Text
        value="Add new Patient Backend & Blockchain"
        className={clsx(
          'text-xl font-bold text-left text-neutral-700 mb-[20px]'
        )}
      />
      <div className="flex flex-col gap-[40px]">
        <Input
          label="NIK"
          id="govId"
          name="govId"
          value={patientParams.govId}
          onChange={onChange}
          containerClassName="flex flex-col gap-[20px]"
          inputClassName="p-3 border border-black rounded-lg"
        />
        <Input
          label="Email"
          id="email"
          name="email"
          value={patientParams.email}
          onChange={onChange}
          containerClassName="flex flex-col gap-[20px]"
          inputClassName="p-3 border border-black rounded-lg"
        />
        <Input
          label="Name"
          id="name"
          name="name"
          value={patientParams.name}
          onChange={onChange}
          containerClassName="flex flex-col gap-[20px]"
          inputClassName="p-3 border border-black rounded-lg"
        />
        <Input
          label="Patient Address"
          id="patientAddress"
          name="patientAddress"
          value={patientParams.patientAddress}
          onChange={onChange}
          containerClassName="flex flex-col gap-[20px]"
          inputClassName="p-3 border border-black rounded-lg"
        />
        <Input
          label="Mother's Name"
          id="mothersName"
          name="mothersName"
          value={patientParams.mothersName}
          onChange={onChange}
          containerClassName="flex flex-col gap-[20px]"
          inputClassName="p-3 border border-black rounded-lg"
        />
        <Input
          label="Father's Name"
          id="fathersName"
          name="fathersName"
          value={patientParams.fathersName}
          onChange={onChange}
          containerClassName="flex flex-col gap-[20px]"
          inputClassName="p-3 border border-black rounded-lg"
        />
        <Input
          label="Password"
          id="password"
          name="password"
          type="password"
          value={patientParams.password}
          onChange={onChange}
          containerClassName="flex flex-col gap-[20px]"
          inputClassName="p-3 border border-black rounded-lg"
        />
        <div
          className={clsx(
            'w-full flex',
            status.error !== '' || status.success !== ''
              ? 'justify-between'
              : 'justify-end'
          )}
        >
          <div className="flex flex-col gap-[5px]">
            {status.success !== '' && (
              <Text
                value={status.success}
                className={clsx(
                  'text-sm font-semibold text-left text-green-500'
                )}
              />
            )}
            {status.error !== '' && (
              <Text
                value={status.error}
                className={clsx('text-sm font-semibold text-left text-red-500')}
              />
            )}
          </div>
          <button
            onClick={onSubmit}
            className={clsx(
              'px-6 py-3 rounded-lg bg-sky-500',
              (!patientParams.govId ||
                !patientParams.email ||
                !patientParams.name ||
                !patientParams.patientAddress ||
                !patientParams.fathersName ||
                !patientParams.mothersName ||
                !patientParams.password) &&
                'bg-gray-300'
            )}
            disabled={
              !patientParams.govId ||
              !patientParams.email ||
              !patientParams.name ||
              !patientParams.patientAddress ||
              !patientParams.fathersName ||
              !patientParams.mothersName ||
              !patientParams.password
            }
          >
            {isLoadingBlockchain && isLoadingBackend ? 'Loading...' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  );
};

const ListPatient: React.FC = () => {
  const { authData } = LoginStore.useLoginPersistStore(
    (state) => ({
      authData: state.authData,
    }),
    shallow
  );

  const { data: patient } = getPatient();

  const patientData = useMemo(() => {
    const data = patient?.data?.data;
    return data ? data : null;
  }, [patient]);

  return (
    <div className="w-full">
      <Text
        value="Patient Section"
        className={clsx('text-3xl font-bold text-left text-neutral-700')}
      />
      {authData.role === 'Admin' && <SectionCreatePatient />}
      <div className={clsx('my-[30px]')}>
        <Text
          value="List Patient Backend"
          className={clsx(
            'text-xl font-bold text-left text-neutral-700 mb-[20px]'
          )}
        />
        <List type="PATIENT">
          {patientData &&
            patientData?.map((patient: any) => (
              <ChildList
                key={patient.govId}
                params1={patient.govId}
                params2={patient.name}
                params3={patient.email}
              />
            ))}
        </List>
      </div>
      {(authData.role === 'Admin' || authData.role === 'Doctor') && (
        <SectionGetPatientBlockchain />
      )}
    </div>
  );
};

type TPatientParams = {
  govId: string;
  name: string;
  email: string;
  password: string;
  patientAddress: string;
  mothersName: string;
  fathersName: string;
};

export default ListPatient;
