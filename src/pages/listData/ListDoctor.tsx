import React, { useMemo } from 'react';
import List from '../../components/List/List';
import ChildList from '../../components/List/ChildList';
import { getDoctor } from '../../services/express';

const ListDoctor: React.FC = () => {
  const { data: doctor } = getDoctor();

  const doctorData = useMemo(() => {
    const data = doctor?.data?.data;
    return data ? data : null;
  }, [doctor]);

  return (
    <div>
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
  );
};

export default ListDoctor;
