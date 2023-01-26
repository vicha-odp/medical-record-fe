import React from 'react';
import LoginStore from '../../store/login';
import { shallow } from 'zustand/shallow';
import Biodata from '../../components/Biodata/Biodata';

const DashboardDoctor: React.FC = () => {
  const { authData } = LoginStore.useLoginPersistStore(
    (state) => ({
      authData: state.authData,
    }),
    shallow
  );

  return (
    <div>
      <Biodata
        govId={authData.govId}
        role={authData.role}
        name={authData.name}
        email={authData.email}
      />
    </div>
  );
};

export default DashboardDoctor;
