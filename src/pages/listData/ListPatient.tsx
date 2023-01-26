import React, { useMemo } from 'react';
import List from '../../components/List/List';
import ChildList from '../../components/List/ChildList';
import { getPatient } from '../../services/express';

const ListPatient: React.FC = () => {
  const { data: patient } = getPatient();

  const patientData = useMemo(() => {
    const data = patient?.data?.data;
    return data ? data : null;
  }, [patient]);

  return (
    <div>
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
  );
};

export default ListPatient;