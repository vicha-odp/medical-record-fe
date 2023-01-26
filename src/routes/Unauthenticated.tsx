import React from 'react';
import { Routes as ReactRoutes, Route, Navigate } from 'react-router-dom';
import loadable from '@loadable/component';

const LoginPage = loadable(() => import('../pages/login/index'));

const Unauthenticated: React.FC = () => (
  <ReactRoutes>
    <Route path="/" element={<Navigate to="/auth/login" replace />} />
    <Route
      path="/dashboard/*"
      element={<Navigate to="/auth/login" replace />}
    />
    <Route index path="/auth/login" element={<LoginPage />} />
  </ReactRoutes>
);

export default Unauthenticated;
