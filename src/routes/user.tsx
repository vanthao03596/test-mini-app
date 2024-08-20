import { ReferencePage } from '@/pages/ReferencePage';
import { UserPage } from '@/pages/UserPage';
import { RouteObject } from 'react-router-dom';

const userRouter: RouteObject[] = [
    {
        path: 'user',
        element: <UserPage />,
        // lazy: async () => {
        //     const { UserPage } = await import('@/pages/UserPage');
        //     return { Component: UserPage };
        // },
    },
    {
        path: 'reference',
        element: <ReferencePage />,
        // lazy: async () => {
        //     const { ReferencePage } = await import('@/pages/ReferencePage');
        //     return { Component: ReferencePage };
        // },
    },
];

export default userRouter;
