import { RouteObject } from 'react-router-dom';

const cryptoRouter: RouteObject[] = [
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
