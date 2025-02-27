import { RouteObject } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { Login } from '../pages/Login';
import { DashboardLayout } from '../components/DashboardLayout';
import { Dashboard } from '../pages/Dashboard';
import { Devices } from '../pages/Devices';
import { DeviceMap } from '../pages/DeviceMap';
import { Reports } from '../pages/Reports';
import { Settings } from '../pages/Settings';
import { DeviceDashboard } from "../pages/DeviceDashboard";
import { DeviceDashboardNew} from "../pages/DeviceDashboardNew";
import { EditDevice } from "../pages/EditDevice";
import { CreateDevice } from "../pages/CreateDevice";

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
      { path: '/devices/:id', element: <DeviceDashboard /> },
      { path: '/devices/:id/new', element: <DeviceDashboardNew /> },
      { path: '/devices/:id/edit', element: <EditDevice /> },
      { path: '/devices/create', element: <CreateDevice /> },
      { path: '/device-map', element: <DeviceMap /> },
      { path: '/reports', element: <Reports /> },
      { path: '/settings', element: <Settings /> },
    ],
  },
];
