import DashboardPage from '@/pages/dashboard-page';
import SignInPage from '@/pages/signin-page.tsx';
import { createBrowserRouter, Navigate, Outlet, useNavigate } from 'react-router-dom';
import globalRouter from '@/app/router/global-router.ts';
import { useAppDispatch } from '../redux/store';
import { unauthenticate } from '@/features/auth/slice/auth-slice';
import { Layout } from '@/components/layout/layout';

const RouteWall = ({ privateRoute }: { privateRoute?: boolean }) => {
  const dispatch = useAppDispatch();

  const onLogout = () => {
    dispatch(unauthenticate());
  };

  const navigate = useNavigate();
  globalRouter.navigate = navigate;

  const token = localStorage.getItem('token');

  if (!token && privateRoute) {
    return <Navigate to="/login" />;
  }

  if (privateRoute) {
    return <Layout onLogout={onLogout} />;
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
