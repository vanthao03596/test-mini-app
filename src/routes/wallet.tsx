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
    {
        path: 'wallet/withdraw',
        lazy: async () => {
            const { WithdrawPage } = await import('@/pages/WithdrawPage');
            return { Component: WithdrawPage };
        },
    },
    {
        path: 'wallet/receive',
        lazy: async () => {
            const { ReceivePage } = await import('@/pages/ReceivePage');
            return { Component: ReceivePage };
        },
    },
];

export default walletRouter;
