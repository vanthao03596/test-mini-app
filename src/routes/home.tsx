import { RouteObject } from 'react-router-dom';

const homeRouter: RouteObject[] = [
    {
        index: true,
        lazy: async () => {
            const { HomePage } = await import('@/pages/HomePage');
            return { Component: HomePage };
        },
    },
];

export default homeRouter;
