import { ComingSoonPage } from '@/pages/ComingSoonPage';
import { VerifyEmailPage } from '@/pages/VerifyEmailPage';
import { WalletHistoryPage } from '@/pages/WalletHistoryPage';
import { WalletPage } from '@/pages/WalletPage';
import { WithdrawPage } from '@/pages/WithdrawPage';
import { RouteObject } from 'react-router-dom';

const walletRouter: RouteObject[] = [
    {
        path: 'wallet',
        element: <WalletPage />,
    },
    {
        path: 'wallet/history',
        element: <WalletHistoryPage />,
    },
    {
        path: 'wallet/withdraw',
        element: <WithdrawPage />,
        // element: <ComingSoonPage />,
    },
    { path: '/verify-email', element: <VerifyEmailPage /> },
    {
        path: 'wallet/receive',
        element: <ComingSoonPage />,
    },
];

export default walletRouter;
