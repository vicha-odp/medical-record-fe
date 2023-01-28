import React, { useMemo, useState } from 'react';
import clsx from 'clsx';
import Text from '../../components/Text/Text';
import List from '../../components/List/List';
import Input from '../../components/Input';
import {
  getMedicalRecordBlockchain,
  postMedicalRecordBlockchain,
} from '../../services/blockchain';
import { postMedicalRecord, getMedicalRecord } from '../../services/express';
import ChildList from '../../components/List/ChildList';
import LoginStore from '../../store/login';
import { shallow } from 'zustand/shallow';
import { TLoginPersist } from 'types/login';

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
  const [doctorParams, setDoctorParams] = useState<string>('');

  const { mutate: medicalRecordBlockchain, isLoading } =
    getMedicalRecordBlockchain({
      onSuccess(res) {
        setStatus({ ...status, success: 'Data ditemukan!' });

        setDataDoctor(JSON.parse(JSON.stringify(res.data)).data);

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
    medicalRecordBlockchain({ govId: doctorParams });
  };

  return (
    <div className={clsx('my-[30px]')}>
      <Text
        value="Find Medical Record on Blockchain"
        className={clsx(
          'text-xl font-bold text-left text-neutral-700 mb-[20px]'
        )}
      />
      <div className="flex flex-col gap-[40px]">
        <Input
          label="Patient Goverment Id"
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

const SectionCreateMedicalRecord: React.FC<{ authData: TLoginPersist }> = ({
  authData,
}) => {
  const defaultMedicalRecordParams: TMedicalRecordParams = {
    patientGovId: authData.role === 'Patient' ? authData.govId : '',
    doctorGovId: authData.role === 'Doctor' ? authData.govId : '',
    categoryId: authData.categoryName!,
    description: '',
  };

  const defaultStatus = {
    success: '',
    error: '',
  };

  const [medicalRecordParams, setMedicalRecordParams] =
    useState<TMedicalRecordParams>(defaultMedicalRecordParams);
  const [status, setStatus] = useState<typeof defaultStatus>(defaultStatus);

  const {
    mutate: sendMedicalRecordBlockchain,
    isLoading: isLoadingBlockchain,
  } = postMedicalRecordBlockchain({
    onSuccess() {
      setStatus({
        ...status,
        success: 'Medical Record Successfully Created BC!',
      });

      setTimeout(() => {
        setStatus(defaultStatus);
      }, 4000);
    },
    onError() {
      setStatus({ ...status, success: 'Medical Record Failed Created! BC' });

      setTimeout(() => {
        setStatus(defaultStatus);
      }, 4000);
    },
  });
  const { mutate: sendMedicalRecordBackend, isLoading: isLoadingBackend } =
    postMedicalRecord({
      onSuccess() {
        setStatus({
          ...status,
          success: 'Medical Record Successfully Created BE!',
        });

        setTimeout(() => {
          setStatus(defaultStatus);
        }, 4000);
      },
      onError() {
        setStatus({ ...status, success: 'Medical Record Failed Created BE!' });

        setTimeout(() => {
          setStatus(defaultStatus);
        }, 4000);
      },
    });

  const onChange = (e: any) => {
    const { name, value } = e.target;

    setMedicalRecordParams({
      ...medicalRecordParams,
      [name]: value,
    });
  };

  const onSubmit = () => {
    sendMedicalRecordBackend({
      patientGovId: medicalRecordParams.patientGovId,
      doctorGovId: medicalRecordParams.doctorGovId,
      categoryId: medicalRecordParams.categoryId,
      description: medicalRecordParams.description,
    });

    sendMedicalRecordBlockchain({
      govId: medicalRecordParams.patientGovId,
      medicalRecord: medicalRecordParams.description,
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
          label="Patient Goverment Id"
          id="patientGovId"
          name="patientGovId"
          value={medicalRecordParams.patientGovId}
          onChange={onChange}
          containerClassName="flex flex-col gap-[20px]"
          inputClassName="p-3 border border-black rounded-lg"
        />
        <Input
          label="Medical Record"
          id="description"
          name="description"
          value={medicalRecordParams.description}
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
              (!medicalRecordParams.patientGovId ||
                !medicalRecordParams.description) &&
                'bg-gray-300'
            )}
            disabled={
              !medicalRecordParams.patientGovId ||
              !medicalRecordParams.description
            }
          >
            {isLoadingBlockchain && isLoadingBackend ? 'Loading...' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  );
};

const ListMedicalRecord: React.FC = () => {
  const { authData } = LoginStore.useLoginPersistStore(
    (state) => ({
      authData: state.authData,
    }),
    shallow
  );

  const fetchParams =
    authData.role === 'Patient'
      ? {
          params: {
            patientId: authData.role === 'Patient' ? authData.govId : '',
          },
        }
      : authData.role === 'Doctor'
      ? {
          params: {
            doctorId: authData.role === 'Doctor' ? authData.govId : '',
          },
        }
      : {};

  const { data: medrec } = getMedicalRecord({}, fetchParams);

  const medrecData = useMemo(() => {
    const data = medrec?.data?.data;
    return data ? data : null;
  }, [medrec]);

  return (
    <div className="w-full">
      <Text
        value="Medical Record Section"
        className={clsx('text-3xl font-bold text-left text-neutral-700')}
      />
      {authData.role === 'Doctor' && (
        <SectionCreateMedicalRecord authData={authData} />
      )}
      <div className={clsx('my-[30px]')}>
        <Text
          value="List Medical Record Backend"
          className={clsx(
            'text-xl font-bold text-left text-neutral-700 mb-[20px]'
          )}
        />
        <List type="MEDREC">
          {medrecData &&
            medrecData?.map((medrec: any) => (
              <ChildList
                key={medrec.medRecId}
                params1={medrec.patientGovId}
                params2={medrec.doctorGovId}
                params3={medrec.description}
              />
            ))}
        </List>
      </div>
      <SectionGetDoctorBlockchain />
    </div>
  );
};

type TMedicalRecordParams = {
  patientGovId: string;
  doctorGovId: string;
  categoryId: 'Psychiatry' | 'Neurology' | '';
  description: string;
};

export default ListMedicalRecord;
