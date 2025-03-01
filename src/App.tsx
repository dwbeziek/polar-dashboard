import { BrowserRouter, useRoutes } from 'react-router-dom';
import { ThemeProviderWrapper } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { routes } from './routes/routes';
import './i18n/i18n';
import 'leaflet/dist/leaflet.css';

const queryClient = new QueryClient();

const AppRoutes = () => useRoutes(routes);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProviderWrapper>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </ThemeProviderWrapper>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
