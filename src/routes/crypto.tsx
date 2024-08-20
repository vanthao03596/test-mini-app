import { CryptoPage } from '@/pages/CryptoPage';
import { ResearchDetailPage } from '@/pages/ResearchDetailPage';
import { ResearchPage } from '@/pages/ResearchPage';
import { TrendingPage } from '@/pages/TrendingPage';
import { RouteObject } from 'react-router-dom';

const cryptoRouter: RouteObject[] = [
    {
        path: 'crypto',
        element: <CryptoPage />,
        // lazy: async () => {
        //     const { CryptoPage } = await import('@/pages/CryptoPage');
        //     return { Component: CryptoPage };
        // },
    },
    {
        path: 'trending',
        element: <TrendingPage />,
        // lazy: async () => {
        //     const { TrendingPage } = await import('@/pages/TrendingPage');
        //     return { Component: TrendingPage };
        // },
    },
    {
        path: 'research',
        element: <ResearchPage />,
        // lazy: async () => {
        //     const { ResearchPage } = await import('@/pages/ResearchPage');
        //     return { Component: ResearchPage };
        // },
    },
    {
        path: 'research/:researchId',
        element: <ResearchDetailPage />,
        // lazy: async () => {
        //     const { ResearchDetailPage } = await import('@/pages/ResearchDetailPage');
        //     return { Component: ResearchDetailPage };
        // },
    },
];

export default cryptoRouter;
