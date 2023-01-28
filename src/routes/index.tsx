import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Authenticated from './Authenticated';
import Unauthenticated from './Unauthenticated';
import LoginStore from '../store/login';
import { shallow } from 'zustand/shallow';

const Routes: React.FC = () => {
  const { isAuthenticated } = LoginStore.useLoginPersistStore(
    (state) => ({
      isAuthenticated: state.isAuthenticated,
    }),
    shallow
  );

  return (
    <Router>{isAuthenticated ? <Authenticated /> : <Unauthenticated />}</Router>
  );
};

export default Routes;
