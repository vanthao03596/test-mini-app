import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ProtectedRoutes } from './ProtectedRoute';
import { LoginPage } from '@/pages/LoginPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <ProtectedRoutes />,
        children: [
            {
                index: true,
                lazy: async () => {
                    const { HomePage } = await import('@/pages/HomePage');
                    return { Component: HomePage };
                },
            },
            {
                path: 'wallet',
                lazy: async () => {
                    const { WalletPage } = await import('@/pages/WalletPage');
                    return { Component: WalletPage };
                },
            },
            {
                path: 'wallet/history',
                lazy: async () => {
                    const { WalletHistoryPage } = await import('@/pages/WalletHistoryPage');
                    return { Component: WalletHistoryPage };
                },
            },
            {
                path: 'research',
                lazy: async () => {
                    const { ResearchPage } = await import('@/pages/ResearchPage');
                    return { Component: ResearchPage };
                },
            },
            {
                path: 'quest',
                lazy: async () => {
                    const { QuestPage } = await import('@/pages/QuestPage');
                    return { Component: QuestPage };
                },
            },
            {
                path: 'user',
                lazy: async () => {
                    const { UserPage } = await import('@/pages/UserPage');
                    return { Component: UserPage };
                },
            },
        ],
    },
    { path: '/login', element: <LoginPage /> },
    {
        path: '*',
        element: <Navigate to='/' />,
    },
]);

export default router;
