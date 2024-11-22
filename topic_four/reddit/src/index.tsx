import ReactDOM from 'react-dom/client';
import './index.css';
import { persistor, store } from 'store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { router } from 'routes/Routes';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const queryClient = new QueryClient();
root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </QueryClientProvider>
);
