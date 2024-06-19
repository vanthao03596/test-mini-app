import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import './App.module.scss';
import useWebApp from './hooks/useWebApp';
import useWebAppViewport from './hooks/useWebAppViewport';
import { HomePage } from './pages/HomePage';
import { WalletHistoryPage } from './pages/WalletHistoryPage';
import { WalletPage } from './pages/WalletPage';
import { ProtectedRoutes } from './routes/ProtectedRoute';
import { SpinLoading } from 'antd-mobile';
import styles from './App.module.scss'
const router = createBrowserRouter([
    {
        path: '/',
        element: <ProtectedRoutes />,
        children: [
            { index: true, element: <HomePage /> },
            {
                path: 'wallet',
                element: <WalletPage />,
            },
            {
                path: 'wallet/history',
                element: <WalletHistoryPage />,
            },
        ],
    },
    {
        path: '*',
        element: <Navigate to='/' />,
    },
]);

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 10000,
        },
    },
});

function Loading() {
    return (
        <div className={styles.loadingDiv} >
            <SpinLoading color='primary'/>
        </div>
    )
}

function App() {
    const { ready, isReady } = useWebApp();
    const { expand } = useWebAppViewport();

    useEffect(() => {
        ready();
        if (isReady) {
            expand();
        }
    }, [expand, isReady, ready]);

    useEffect(() => {
        document.documentElement.setAttribute('data-prefers-color-scheme', 'dark');
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
}

export default App;
