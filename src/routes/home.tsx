import { RouteObject } from 'react-router-dom';

const homeRouter: RouteObject[] = [
    {
        index: true,
        lazy: async () => {
            const { EarnPage } = await import('@/pages/EarnPage');
            return { Component: EarnPage };
        },
    },
];

export default homeRouter;
