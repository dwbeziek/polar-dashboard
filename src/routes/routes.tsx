import { RouteObject } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { Login } from '../pages/Login';
import { DashboardLayout } from '../components/DashboardLayout';
import { Dashboard } from '../pages/Dashboard';
import { Devices } from '../pages/Devices';
import { DeviceDetails } from '../pages/DeviceDetails';
import { DeviceMap } from '../pages/DeviceMap';
import { Reports } from '../pages/Reports';
import { Settings } from '../pages/Settings';

export const routes: RouteObject[] = [
  { path: '/login', element: <Login /> },
  {
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/devices', element: <Devices /> },
      { path: '/devices/:imei', element: <DeviceDetails /> },
      { path: '/device-map', element: <DeviceMap /> },
      { path: '/reports', element: <Reports /> },
      { path: '/settings', element: <Settings /> },
    ],
  },
];
