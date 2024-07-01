import { RouteObject } from 'react-router-dom';

const userRouter: RouteObject[] = [
    {
        path: 'user',
        lazy: async () => {
            const { UserPage } = await import('@/pages/UserPage');
            return { Component: UserPage };
        },
    },
    {
        path: 'reference',
        lazy: async () => {
            const { ReferencePage } = await import('@/pages/ReferencePage');
            return { Component: ReferencePage };
        },
    },
];

export default userRouter;
