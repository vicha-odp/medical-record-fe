import React from 'react';
import { Routes as ReactRoutes, Route, Navigate } from 'react-router-dom';
import loadable from '@loadable/component';
import LoginStore from '../store/login';
import { shallow } from 'zustand/shallow';

const DashboardAdminPage = loadable(
  () => import('../pages/dashboard/DashboardAdmin')
);
const Layout = loadable(() => import('../layout/Page'));

const Authenticated: React.FC = () => {
  const { authData } = LoginStore.useLoginPersistStore(
    (state) => ({
      authData: state.authData,
    }),
    shallow
  );

  return (
    <ReactRoutes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route
        path="/auth/login"
        element={<Navigate to="/dashboard" replace />}
      />
      {authData.role === 'Admin' && (
        <Route path="/dashboard" element={<Layout />}>
          <Route
            path="/dashboard"
            element={<Navigate to="/dashboard/admin" replace />}
          />
          <Route
            index
            path="/dashboard/admin"
            element={<DashboardAdminPage />}
          />
          <Route
            index
            path="/dashboard/listAdmin"
            element={<DashboardAdminPage />}
          />
          <Route
            index
            path="/dashboard/listPatient"
            element={<DashboardAdminPage />}
          />
          <Route
            index
            path="/dashboard/listDoctor"
            element={<DashboardAdminPage />}
          />
          <Route
            index
            path="/dashboard/listMedicalRecord"
            element={<DashboardAdminPage />}
          />
        </Route>
      )}
      {authData.role === 'Patient' && (
        <Route path="/dashboard" element={<Layout />}>
          <Route
            path="/dashboard"
            element={<Navigate to="/dashboard/patient" replace />}
          />
          <Route
            index
            path="/dashboard/patient"
            element={<DashboardAdminPage />}
          />
        </Route>
      )}
      {authData.role === 'Doctor' && (
        <Route path="/dashboard" element={<Layout />}>
          <Route
            path="/dashboard"
            element={<Navigate to="/dashboard/doctor" replace />}
          />
          <Route
            index
            path="/dashboard/doctor"
            element={<DashboardAdminPage />}
          />
        </Route>
      )}
    </ReactRoutes>
  );
};

export default Authenticated;
