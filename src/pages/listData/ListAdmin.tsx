import React, { useMemo } from 'react';
import List from '../../components/List/List';
import ChildList from '../../components/List/ChildList';
import { getAdmin } from '../../services/express';

const ListAdmin: React.FC = () => {
  const { data: admin } = getAdmin();

  const adminData = useMemo(() => {
    const data = admin?.data?.data;
    return data ? data : null;
  }, [admin]);

  return (
    <div>
      <List type="ADMIN">
        {adminData &&
          adminData?.map((admin: any) => (
            <ChildList
              key={admin.govId}
              params1={admin.govId}
              params2={admin.name}
              params3={admin.email}
            />
          ))}
      </List>
    </div>
  );
};

export default ListAdmin;