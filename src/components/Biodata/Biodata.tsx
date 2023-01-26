import React from 'react';
import clsx from 'clsx';
import Text from '../Text/Text';
import { TOptionSelected } from '../../types/login';

const Biodata: React.FC<TBiodata> = ({ govId, name, email, role }) => {
  return (
    <div className="flex flex-col gap-[20px]">
      <Text
        value="Biodata"
        className={clsx('text-3xl font-bold text-left text-neutral-700')}
      />
      <div className="flex flex-col gap-[10px]">
        <Text
          value={role}
          className={clsx('text-xl font-semibold text-left text-red-400')}
        />
        <Text
          value={govId}
          className={clsx('text-xl font-semibold text-left text-neutral-700')}
        />
        <Text
          value={name}
          className={clsx('text-xl font-semibold text-left text-neutral-700')}
        />
        <Text
          value={email}
          className={clsx('text-xl font-semibold text-left text-neutral-700')}
        />
      </div>
    </div>
  );
};

type TBiodata = {
  govId: string;
  name: string;
  email: string;
  role: TOptionSelected['title'];
};

export default Biodata;
