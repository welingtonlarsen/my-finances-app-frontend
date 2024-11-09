import DashboardPage from '@/pages/dashboard-page';
import SignInPage from '@/pages/signin-page.tsx';
import { createBrowserRouter, Navigate, Outlet, useNavigate } from 'react-router-dom';
import globalRouter from '@/app/router/global-router.ts';
import { useAppDispatch } from '../redux/store';
import { unauthenticate } from '@/features/auth/slice/auth-slice';
import { Layout } from '@/components/layout/layout';
import BillsPage from '@/pages/bills-page';
import FinancialIndependence from '@/pages/goals-page';

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
        index: true,
        element: <Navigate to="/expenses" replace />,
      },
      {
        path: '/expenses',
        element: <DashboardPage />,
      },
      {
        path: '/bills',
        element: <BillsPage />,
      },
      {
        path: 'independencia-financeira',
        element: <FinancialIndependence />,
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
