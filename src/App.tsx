import { RouterProvider } from 'react-router-dom';
import DashboardPage from '@/pages/dashboard';
import { Toaster } from '@/components/ui/toaster';
import { router } from './app/routes';

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
