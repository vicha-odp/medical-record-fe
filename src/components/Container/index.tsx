import clsx from 'clsx';
import React, { ReactNode } from 'react';

const Container: React.FC<TContainer> = ({ className, children }) => {
  return <div className={clsx('w-[900px]', className)}>{children}</div>;
};

type TContainer = {
  children: ReactNode;
  className?: string;
};

Container.defaultProps = {
  className: '',
};

export default Container;
