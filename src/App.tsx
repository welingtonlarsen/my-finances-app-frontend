import { RouterProvider } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { router } from './app/router/routes';
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
