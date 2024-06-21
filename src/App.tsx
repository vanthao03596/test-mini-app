import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import './App.module.scss';
import useWebApp from './hooks/useWebApp';
import useWebAppViewport from './hooks/useWebAppViewport';
import { HomePage } from './pages/HomePage';
import { WalletHistoryPage } from './pages/WalletHistoryPage';
import { WalletPage } from './pages/WalletPage';
import { ProtectedRoutes } from './routes/ProtectedRoute';
import { SpinLoading } from 'antd-mobile';
import styles from './App.module.scss';
import '@/lib/dayjs';
import { ResearchPage } from './pages/ResearchPage';
import { QuestPage } from './pages/QuestPage';
import { UserPage } from './pages/UserPage';

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
            {
                path: 'research',
                element: <ResearchPage />,
            },
            {
                path: 'quest',
                element: <QuestPage />,
            },
            {
                path: 'user',
                element: <UserPage />,
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
        <div className={styles.loadingDiv}>
            <SpinLoading color='primary' />
        </div>
    );
}

function App() {
    const { ready, isReady, enableClosingConfirmation } = useWebApp();
    const { expand, isExpanded } = useWebAppViewport();

    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        ready();
        if (isReady) {
            expand();
            enableClosingConfirmation()
        }
    }, [isReady]);

    useEffect(() => {
        document.documentElement.setAttribute('data-prefers-color-scheme', 'dark');
    }, []);

    useEffect(() => {
        if (isExpanded && !isCompleted) {
            setTimeout(() => {
                setIsCompleted(true);
            }, 1500);
        }
    }, [isExpanded, isCompleted]);

    if (!isExpanded) {
        return <></>;
    }

    if (!isCompleted) {
        return <Loading />;
    }

    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
}

export default App;
