import { BoosterPlusPage } from '@/pages/BoosterPlusPage';
import { ComingSoonPage } from '@/pages/ComingSoonPage';
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
    },
    {
        path: 'wallet/receive',
        element: <ComingSoonPage />,
    },
    {
        path: 'wallet/booster-plus',
        element: <BoosterPlusPage />,
    },
];

export default walletRouter;
