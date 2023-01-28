import React, { useMemo, useState } from 'react';
import clsx from 'clsx';
import Text from '../../components/Text/Text';
import Input from '../../components/Input';
import List from '../../components/List/List';
import ChildList from '../../components/List/ChildList';
import { getAdmin, postAdmin } from '../../services/express';

const SectionCreateAdmin: React.FC = () => {
  const defaultAdminParams = {
    govId: '',
    name: '',
    email: '',
    password: '',
  };

  const [adminParams, setAdminParams] =
    useState<TAdminParams>(defaultAdminParams);
  const [status, setStatus] = useState<string>('');

  const { mutate: sendAdmin, isLoading } = postAdmin({
    onSuccess() {
      setStatus('Admin Successfully Created!');

      setTimeout(() => {
        setStatus('');
      }, 4000);
    },
    onError() {
      setStatus('Admin Failed Created!');

      setTimeout(() => {
        setStatus('');
      }, 4000);
    },
  });

  const onChange = (e: any) => {
    const { name, value } = e.target;

    setAdminParams({
      ...adminParams,
      [name]: value,
    });
  };

  const onSubmit = () => {
    sendAdmin({
      govId: adminParams.govId,
      email: adminParams.email,
      name: adminParams.name,
      password: adminParams.password,
    });
  };

  return (
    <div className={clsx('my-[30px]')}>
      <Text
        value="Add new Admin Backend"
        className={clsx(
          'text-xl font-bold text-left text-neutral-700 mb-[20px]'
        )}
      />
      <div className="flex flex-col gap-[40px]">
        <Input
          label="NIK"
          id="govId"
          name="govId"
          value={adminParams.govId}
          onChange={onChange}
          containerClassName="flex flex-col gap-[20px]"
          inputClassName="p-3 border border-black rounded-lg"
        />
        <Input
          label="Email"
          id="email"
          name="email"
          value={adminParams.email}
          onChange={onChange}
          containerClassName="flex flex-col gap-[20px]"
          inputClassName="p-3 border border-black rounded-lg"
        />
        <Input
          label="Name"
          id="name"
          name="name"
          value={adminParams.name}
          onChange={onChange}
          containerClassName="flex flex-col gap-[20px]"
          inputClassName="p-3 border border-black rounded-lg"
        />
        <Input
          label="Password"
          id="password"
          name="password"
          type="password"
          value={adminParams.password}
          onChange={onChange}
          containerClassName="flex flex-col gap-[20px]"
          inputClassName="p-3 border border-black rounded-lg"
        />
        <div
          className={clsx(
            'w-full flex',
            status !== '' ? 'justify-between' : 'justify-end'
          )}
        >
          {status !== '' && (
            <Text
              value="Add new Admin"
              className={clsx(
                'text-xl font-bold text-left text-green-500 mb-[20px]'
              )}
            />
          )}
          <button
            onClick={onSubmit}
            className={clsx(
              'px-6 py-3 rounded-lg bg-sky-500',
              (!adminParams.govId ||
                !adminParams.email ||
                !adminParams.name ||
                !adminParams.password) &&
                'bg-gray-300'
            )}
            disabled={
              !adminParams.govId ||
              !adminParams.email ||
              !adminParams.name ||
              !adminParams.password
            }
          >
            {isLoading ? 'Loading...' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  );
};

const ListAdmin: React.FC = () => {
  const { data: admin } = getAdmin();

  const adminData = useMemo(() => {
    const data = admin?.data?.data;
    return data ? data : null;
  }, [admin]);

  return (
    <div className="w-full">
      <Text
        value="Admin Section"
        className={clsx('text-3xl font-bold text-left text-neutral-700')}
      />
      <SectionCreateAdmin />
      <div className={clsx('my-[30px]')}>
        <Text
          value="List Admin Backend"
          className={clsx(
            'text-xl font-bold text-left text-neutral-700 mb-[20px]'
          )}
        />
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
    </div>
  );
};

type TAdminParams = {
  govId: string;
  name: string;
  email: string;
  password: string;
};

export default ListAdmin;
