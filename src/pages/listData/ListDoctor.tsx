import React, { useMemo, useState } from 'react';
import clsx from 'clsx';
import Text from '../../components/Text/Text';
import List from '../../components/List/List';
import Input from '../../components/Input';
import ChildList from '../../components/List/ChildList';
import { getDoctor, postDoctor } from '../../services/express';
import {
  getDoctorBlockchain,
  postDoctorBlockchain,
} from '../../services/blockchain';
import LoginStore from '../../store/login';
import { shallow } from 'zustand/shallow';

const SectionGetDoctorBlockchain: React.FC = () => {
  const defaultStatus = {
    success: '',
    error: '',
  };

  const defaultDataDoctor = {
    drName: '',
    drSpecialist: '',
  };

  const [dataDoctor, setDataDoctor] =
    useState<typeof defaultDataDoctor>(defaultDataDoctor);
  const [status, setStatus] = useState<typeof defaultStatus>(defaultStatus);
  const [doctorParams, setDoctorParams] = useState<TDoctorParams['govId']>('');

  const { mutate: patientBlockchain, isLoading } = getDoctorBlockchain({
    onSuccess(res) {
      setStatus({ ...status, success: 'Data ditemukan!' });

      setDataDoctor(res.data);

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

    setDoctorParams(value);
  };

  const onSubmit = () => {
    patientBlockchain({ govId: doctorParams });
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
          value={doctorParams}
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
              !doctorParams && 'bg-gray-300'
            )}
            disabled={!doctorParams}
          >
            {isLoading ? 'Loading...' : 'Find Doctor'}
          </button>
        </div>
      </div>
      <div>
        {dataDoctor && (
          <div className="flex flex-col gap-[10px]">
            <Text
              value={dataDoctor.drName}
              className={clsx('text-xl font-semibold text-left text-sky-500')}
            />
            <Text
              value={dataDoctor.drSpecialist}
              className={clsx('text-xl font-normal text-left text-neutral-700')}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const SectionCreateDoctor: React.FC = () => {
  const defaultDoctorParams = {
    govId: '',
    name: '',
    email: '',
    password: '',
    categorySelected: 0,
  };

  const defaultStatus = {
    success: '',
    error: '',
  };

  const [doctorParams, setDoctorParams] =
    useState<TDoctorParams>(defaultDoctorParams);
  const [status, setStatus] = useState<typeof defaultStatus>(defaultStatus);

  const { mutate: sendDoctorBlockchain, isLoading: isLoadingBlockchain } =
    postDoctorBlockchain({
      onSuccess() {
        setStatus({ ...status, success: 'Doctor Successfully Created BC!' });

        setTimeout(() => {
          setStatus(defaultStatus);
        }, 4000);
      },
      onError() {
        setStatus({ ...status, success: 'Doctor Failed Created! BC' });

        setTimeout(() => {
          setStatus(defaultStatus);
        }, 4000);
      },
    });
  const { mutate: sendDoctorBackend, isLoading: isLoadingBackend } = postDoctor(
    {
      onSuccess() {
        setStatus({ ...status, success: 'Doctor Successfully Created BE!' });

        setTimeout(() => {
          setStatus(defaultStatus);
        }, 4000);
      },
      onError() {
        setStatus({ ...status, success: 'Doctor Failed Created BE!' });

        setTimeout(() => {
          setStatus(defaultStatus);
        }, 4000);
      },
    }
  );

  const onChange = (e: any) => {
    const { name, value } = e.target;

    setDoctorParams({
      ...doctorParams,
      [name]: value,
    });
  };

  const onClick = (e: any) => {
    const { id } = e.target;

    setDoctorParams({
      ...doctorParams,
      categorySelected: +id,
    });
  };

  const onSubmit = () => {
    sendDoctorBackend({
      govId: doctorParams.govId,
      email: doctorParams.email,
      name: doctorParams.name,
      password: doctorParams.password,
      categorySelected: doctorParams.categorySelected,
    });

    const specialist =
      doctorParams.categorySelected === 0 ? 'Psychiatry' : 'Neurology';

    sendDoctorBlockchain({
      govId: doctorParams.govId,
      name: doctorParams.name,
      specialist: specialist,
    });
  };

  return (
    <div className={clsx('my-[30px]')}>
      <Text
        value="Add new Doctor Backend & Blockchain"
        className={clsx(
          'text-xl font-bold text-left text-neutral-700 mb-[20px]'
        )}
      />
      <div className="flex flex-col gap-[40px]">
        <Input
          label="NIK"
          id="govId"
          name="govId"
          value={doctorParams.govId}
          onChange={onChange}
          containerClassName="flex flex-col gap-[20px]"
          inputClassName="p-3 border border-black rounded-lg"
        />
        <Input
          label="Email"
          id="email"
          name="email"
          value={doctorParams.email}
          onChange={onChange}
          containerClassName="flex flex-col gap-[20px]"
          inputClassName="p-3 border border-black rounded-lg"
        />
        <Input
          label="Name"
          id="name"
          name="name"
          value={doctorParams.name}
          onChange={onChange}
          containerClassName="flex flex-col gap-[20px]"
          inputClassName="p-3 border border-black rounded-lg"
        />
        <Input
          label="Password"
          id="password"
          name="password"
          type="password"
          value={doctorParams.password}
          onChange={onChange}
          containerClassName="flex flex-col gap-[20px]"
          inputClassName="p-3 border border-black rounded-lg"
        />
        <div className={clsx('flex flex-col gap-[8px]')}>
          <label>Specialist</label>
          <div className="w-full flex flex-row justify-start gap-[10px]">
            <div
              id="0"
              className={clsx(
                'bg-sky-100 px-6 py-3 rounded-lg',
                doctorParams.categorySelected === 0 && 'bg-sky-400'
              )}
              onClick={onClick}
              role="button"
              tabIndex={0}
            >
              <Text
                value="Psychiatry"
                className={clsx('text-sm font-bold text-left text-black')}
              />
            </div>
            <div
              id="1"
              className={clsx(
                'bg-sky-100 px-6 py-3 rounded-lg',
                doctorParams.categorySelected === 1 && 'bg-sky-400'
              )}
              onClick={onClick}
              role="button"
              tabIndex={0}
            >
              <Text
                value="Neurology"
                className={clsx('text-sm font-bold text-left text-black')}
              />
            </div>
          </div>
        </div>
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
              (!doctorParams.govId ||
                !doctorParams.email ||
                !doctorParams.name ||
                !doctorParams.password) &&
                'bg-gray-300'
            )}
            disabled={
              !doctorParams.govId ||
              !doctorParams.email ||
              !doctorParams.name ||
              !doctorParams.password
            }
          >
            {isLoadingBlockchain && isLoadingBackend ? 'Loading...' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  );
};

const ListDoctor: React.FC = () => {
  const { authData } = LoginStore.useLoginPersistStore(
    (state) => ({
      authData: state.authData,
    }),
    shallow
  );

  const { data: doctor } = getDoctor();

  const doctorData = useMemo(() => {
    const data = doctor?.data?.data;
    return data ? data : null;
  }, [doctor]);

  return (
    <div className="w-full">
      <Text
        value="Doctor Section"
        className={clsx('text-3xl font-bold text-left text-neutral-700')}
      />
      {authData.role === 'Admin' && <SectionCreateDoctor />}
      <div className={clsx('my-[30px]')}>
        <Text
          value="List Doctor Backend"
          className={clsx(
            'text-xl font-bold text-left text-neutral-700 mb-[20px]'
          )}
        />
        <List type="DOCTOR">
          {doctorData &&
            doctorData?.map((doctor: any) => (
              <ChildList
                key={doctor.govId}
                params1={doctor.govId}
                params2={doctor.name}
                params3={doctor.email}
                params4={doctor.categoryName}
              />
            ))}
        </List>
      </div>
      {(authData.role === 'Admin' || authData.role === 'Patient') && (
        <SectionGetDoctorBlockchain />
      )}
    </div>
  );
};

type TDoctorParams = {
  govId: string;
  name: string;
  email: string;
  password: string;
  categorySelected: number;
};

export default ListDoctor;
