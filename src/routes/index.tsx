import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Unauthenticated from './Unauthenticated';

const Routes = () => {
  return (
    <Router>
      <Unauthenticated />
    </Router>
  );
};

export default Routes;
