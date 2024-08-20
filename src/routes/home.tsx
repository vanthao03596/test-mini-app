import { MintPage } from '@/pages/MintPage';
import { RouteObject } from 'react-router-dom';

const homeRouter: RouteObject[] = [
    {
        index: true,
        element: <MintPage />,
        // lazy: async () => {
        //     const { MintPage } = await import('@/pages/MintPage');
        //     return { Component: MintPage };
        // },
    },
];

export default homeRouter;
