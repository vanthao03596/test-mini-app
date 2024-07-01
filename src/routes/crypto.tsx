import { RouteObject } from 'react-router-dom';

const cryptoRouter: RouteObject[] = [
    {
        path: 'crypto',
        lazy: async () => {
            const { CryptoPage } = await import('@/pages/CryptoPage');
            return { Component: CryptoPage };
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
];

export default cryptoRouter;
