import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import './App.module.scss';
import useWebApp from './hooks/useWebApp';
import useWebAppViewport from './hooks/useWebAppViewport';
import { ProtectedRoutes } from './routes/ProtectedRoute';
import { SpinLoading } from 'antd-mobile';
import styles from './App.module.scss';
import '@/lib/dayjs';
import { LoginPage } from './pages/LoginPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <ProtectedRoutes />,
        children: [
            { index: true, 
                lazy: async () => {const { HomePage } = await import("./pages/HomePage")
                return { Component: HomePage }},  
             },
            {
                path: 'wallet',
                lazy: async () => {const { WalletPage } = await import("./pages/WalletPage")
                return { Component: WalletPage }},  
            },
            {
                path: 'wallet/history',
                lazy: async () => {const { WalletHistoryPage } = await import("./pages/WalletHistoryPage")
                return { Component: WalletHistoryPage }},  
            },
            {
                path: 'research',
                lazy: async () => {const { ResearchPage } = await import("./pages/ResearchPage")
                return { Component: ResearchPage }},  
            },
            {
                path: 'quest',
                lazy: async () => {const { QuestPage } = await import("./pages/QuestPage")
                return { Component: QuestPage }},  
            },
            {
                path: 'user',
                lazy: async () => {const { UserPage } = await import("./pages/UserPage")
                return { Component: UserPage }},  
            },
        ],
    },
    { path: '/login', element: <LoginPage /> },
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

    if (!isExpanded && !isReady) {
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
