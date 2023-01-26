import React from 'react';
import clsx from 'clsx';
import Container from '../components/Container';
import Text from '../components/Text/Text';
import LoginStore from '../store/login';
import { shallow } from 'zustand/shallow';
import { deafultLoginPersist } from '../types/login';
import { Link } from 'react-router-dom';

const LogoutButton: React.FC = () => {
  const { setAuthData, setIsAuthenticated } = LoginStore.useLoginPersistStore(
    (state) => ({
      setAuthData: state.setAuthData,
      setIsAuthenticated: state.setIsAuthenticated,
    }),
    shallow
  );

  const onClick = () => {
    setAuthData(deafultLoginPersist);
    setIsAuthenticated(false);
  };

  return (
    <button className="bg-red-500 px-3 py-1.5 rounded-lg" onClick={onClick}>
      <Text
        value="Log out"
        className={clsx('text-sm font-medium text-white')}
      />
    </button>
  );
};

const AdminMenu = () => {
  return (
    <div className="pl-[10px] flex flex-row gap-[30px] items-center">
      <Link to="/dashboard/listAdmin">
        <Text
          value="Admin"
          className={clsx('text-sm font-medium text-left text-neutral-500')}
        />
      </Link>
      <Link to="/dashboard/listPatient">
        <Text
          value="Patient"
          className={clsx('text-sm font-medium text-left text-neutral-500')}
        />
      </Link>
      <Link to="/dashboard/listDoctor">
        <Text
          value="Doctor"
          className={clsx('text-sm font-medium text-left text-neutral-500')}
        />
      </Link>
      <Link to="/dashboard/listMedicalRecord">
        <Text
          value="Medical Record"
          className={clsx('text-sm font-medium text-left text-neutral-500')}
        />
      </Link>
    </div>
  );
};

const PatientMenu = () => {
  return (
    <div className="pl-[10px] flex flex-row gap-[30px] items-center">
      <Link to="/dashboard/listAdmin">
        <Text
          value="Doctor"
          className={clsx('text-sm font-medium text-left text-neutral-500')}
        />
      </Link>
      <Link to="/dashboard/listPatient">
        <Text
          value="Medical Record"
          className={clsx('text-sm font-medium text-left text-neutral-500')}
        />
      </Link>
    </div>
  );
};

const DoctorMenu = () => {
  return (
    <div className="pl-[10px] flex flex-row gap-[30px] items-center">
      <Link to="/dashboard/listAdmin">
        <Text
          value="Patient"
          className={clsx('text-sm font-medium text-left text-neutral-500')}
        />
      </Link>
      <Link to="/dashboard/listPatient">
        <Text
          value="Medical Record"
          className={clsx('text-sm font-medium text-left text-neutral-500')}
        />
      </Link>
    </div>
  );
};

const Header = () => {
  const { authData } = LoginStore.useLoginPersistStore(
    (state) => ({
      authData: state.authData,
    }),
    shallow
  );

  return (
    <div className="sticky top-0 w-full h-[80px] bg-neutral-200 flex justify-center items-center">
      <Container>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-[20px]">
            <Link to="/dashboard">
              <Text
                value="Medical Record App"
                className={clsx('text-xl font-bold text-left text-neutral-700')}
              />
            </Link>

            {authData.role === 'Admin' && <AdminMenu />}
            {authData.role === 'Patient' && <PatientMenu />}
            {authData.role === 'Doctor' && <DoctorMenu />}
          </div>
          <div className={clsx('flex flex-row gap-[30px] items-center')}>
            <Text
              value={authData.role}
              className={clsx('text-sm font-bold text-left text-red-500')}
            />
            <Text
              value={authData.name}
              className={clsx('text-sm font-medium text-left text-neutral-700')}
            />
            <LogoutButton />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
