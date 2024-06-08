import { Layout } from '@/components/layout';
import DashboardPage from '@/pages/dashboard';
import SignInPage from '@/pages/signin';
import { createBrowserRouter, Navigate, Outlet, useNavigate } from 'react-router-dom';

const RouteWall = ({ privateRoute }: { privateRoute?: boolean }) => {
  if (privateRoute) {
    return <Layout />;
  }

  return <Outlet />;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RouteWall privateRoute />,
    children: [
      {
        path: '/',
        element: <DashboardPage />,
      },
    ],
  },
  {
    path: '/',
    element: <RouteWall />,
    children: [
      {
        path: '/signin',
        element: <SignInPage />,
      },
    ],
  },
]);
