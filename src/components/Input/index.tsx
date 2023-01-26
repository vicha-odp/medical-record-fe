import React from 'react';
import clsx from 'clsx';

const Input: React.FC<TInput> = ({
  id,
  name,
  type,
  label,
  value,
  onChange,
  inputClassName,
  containerClassName,
}) => {
  return (
    <div className={clsx('flex flex-col gap-[8px]', containerClassName)}>
      {label && <label>{label}</label>}
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        className={clsx(inputClassName)}
        onChange={onChange}
      />
    </div>
  );
};

type TInput = {
  id?: string;
  type?: 'password' | 'search' | 'text';
  name?: string;
  label?: string;
  value: string;
  onChange: (e: any) => void;
  inputClassName?: string;
  containerClassName?: string;
};

Input.defaultProps = {
  id: '',
  type: 'text',
  name: '',
  label: '',
  inputClassName: '',
  containerClassName: '',
};

export default Input;
