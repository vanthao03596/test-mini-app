import { CryptoPage } from '@/pages/CryptoPage';
import { ResearchDetailPage } from '@/pages/ResearchDetailPage';
import { ResearchPage } from '@/pages/ResearchPage';
import { TrendingPage } from '@/pages/TrendingPage';
import { RouteObject } from 'react-router-dom';

const cryptoRouter: RouteObject[] = [
    {
        path: 'crypto',
        element: <CryptoPage />,
    },
    {
        path: 'trending',
        element: <TrendingPage />,
    },
    {
        path: 'research',
        element: <ResearchPage />,
    },
    {
        path: 'research/:researchId',
        element: <ResearchDetailPage />,
    },
];

export default cryptoRouter;
