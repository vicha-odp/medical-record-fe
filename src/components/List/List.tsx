import React, { ReactNode } from 'react';

const HeaderList: React.FC<{ title: string }> = ({ title }) => {
  return <th className="px-6 py-3">{title}</th>;
};

const List: React.FC<TList> = ({ type, children }) => {
  const TYPE = {
    ADMIN: ['GOV ID', 'NAME', 'EMAIL'],
    PATIENT: ['GOV ID', 'NAME', 'EMAIL'],
    DOCTOR: ['GOV ID', 'NAME', 'EMAIL', 'SPECIALIST'],
    MEDREC: ['DOCTOR GOV ID', 'PATIENT GOV ID', 'MEDICAL RECORD'],
  };

  return (
    <div>
      <div>
        <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              {TYPE[type].map((v) => (
                <HeaderList key={v} title={v} />
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  );
};

type TList = {
  type: 'ADMIN' | 'PATIENT' | 'DOCTOR' | 'MEDREC';
  children: ReactNode;
};

export default List;
