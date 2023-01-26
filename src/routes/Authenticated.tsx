import React from 'react';
import { Routes as ReactRoutes, Route, Navigate } from 'react-router-dom';
import loadable from '@loadable/component';

const DashboardPage = loadable(() => import('../pages/dashboard/index'));

const Authenticated: React.FC = () => (
  <ReactRoutes>
    <Route path="/" element={<Navigate to="/dashboard" replace />} />
    <Route path="/auth/login" element={<Navigate to="/dashboard" replace />} />
    <Route index path="/dashboard" element={<DashboardPage />} />
  </ReactRoutes>
);

export default Authenticated;
