import { ReceivePage } from '@/pages/ReceivePage';
import { WalletHistoryPage } from '@/pages/WalletHistoryPage';
import { WalletPage } from '@/pages/WalletPage';
import { WithdrawPage } from '@/pages/WithdrawPage';
import { RouteObject } from 'react-router-dom';

const walletRouter: RouteObject[] = [
    {
        path: 'wallet',
        element: <WalletPage />,
        // lazy: async () => {
        //     const { WalletPage } = await import('@/pages/WalletPage');
        //     return { Component: WalletPage };
        // },
    },
    {
        path: 'wallet/history',
        element: <WalletHistoryPage />,
        // lazy: async () => {
        //     const { WalletHistoryPage } = await import('@/pages/WalletHistoryPage');
        //     return { Component: WalletHistoryPage };
        // },
    },
    {
        path: 'wallet/withdraw',
        element: <WithdrawPage />,
        // lazy: async () => {
        //     const { WithdrawPage } = await import('@/pages/WithdrawPage');
        //     return { Component: WithdrawPage };
        // },
    },
    {
        path: 'wallet/receive',
        element: <ReceivePage />,
        // lazy: async () => {
        //     const { ReceivePage } = await import('@/pages/ReceivePage');
        //     return { Component: ReceivePage };
        // },
    },
];

export default walletRouter;
