import DashboardPage from '@/pages/dashboard-page';
import SignInPage from '@/pages/signin-page.tsx';
import { createBrowserRouter, Navigate, Outlet, useNavigate } from 'react-router-dom';
import globalRouter from '@/app/router/global-router.ts';
import { Layout } from '@/features/layout';

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
