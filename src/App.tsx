import { RouterProvider } from 'react-router-dom';
import DashboardPage from '@/pages/dashboard-page';
import { Toaster } from '@/components/ui/toaster';
import { router } from './app/routes';
import { ThemeProvider } from './app/providers/theme-provider';

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </>
  );
}

export default App;
