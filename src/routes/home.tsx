import { RouteObject } from 'react-router-dom';

const homeRouter: RouteObject[] = [
    {
        index: true,
        // lazy: async () => {
        //     const { HomePage } = await import('@/pages/HomePage');
        //     return { Component: HomePage };
        // },
        lazy: async () => {
            const { MintPage } = await import('@/pages/MintPage');
            return { Component: MintPage };
        },
    },
];

export default homeRouter;
