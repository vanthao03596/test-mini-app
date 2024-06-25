import { LoginPage } from '@/pages/LoginPage';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ProtectedRoutes } from './ProtectedRoute';

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
                path: 'research/:researchId',
                lazy: async () => {
                    const { ResearchDetailPage } = await import('@/pages/ResearchDetailPage');
                    return { Component: ResearchDetailPage };
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
            {
                path: 'booster',
                lazy: async () => {
                    const { BoosterPage } = await import('@/pages/BoosterPage');
                    return { Component: BoosterPage };
                },
            },
            {
                path: 'reference',
                lazy: async () => {
                    const { ReferencePage } = await import('@/pages/ReferencePage');
                    return { Component: ReferencePage };
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
