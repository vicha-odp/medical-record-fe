import React, { useMemo } from 'react';
import List from '../../components/List/List';
import ChildList from '../../components/List/ChildList';
import { getMedicalRecord } from '../../services/express';
import LoginStore from '../../store/login';
import { shallow } from 'zustand/shallow';

const ListMedicalRecord: React.FC = () => {
  const { authData } = LoginStore.useLoginPersistStore(
    (state) => ({
      authData: state.authData,
    }),
    shallow
  );

  const { data: medrec } = getMedicalRecord();

  const medrecData = useMemo(() => {
    const data = medrec?.data?.data;
    return data ? data : null;
  }, [medrec]);

  return (
    <div>
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
  );
};

export default ListMedicalRecord;
