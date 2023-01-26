import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Container from '../components/Container';

const Page: React.FC = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center">
      <Header />
      <Container className="flex flex-col mt-[30px]">
        <Outlet />
      </Container>
    </div>
  );
};

export default Page;
