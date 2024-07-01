import { RouteObject } from 'react-router-dom';

const walletRouter: RouteObject[] = [
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
];

export default walletRouter;
