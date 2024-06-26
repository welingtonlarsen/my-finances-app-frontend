import { Layout } from '@/components/layout';
import DashboardPage from '@/pages/dashboard';
import SignInPage from '@/pages/signin';
import { createBrowserRouter, Navigate, Outlet, useNavigate } from 'react-router-dom';
import globalRouter from '@/app/global-router.ts';

const RouteWall = ({ privateRoute }: { privateRoute?: boolean }) => {
  const navigate = useNavigate();
  globalRouter.navigate = navigate;

  const token = localStorage.getItem('token');

  if (!token && privateRoute) {
    return <Navigate to="/login" />;
  }

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
        path: '/login',
        element: <SignInPage />,
      },
    ],
  },
]);
