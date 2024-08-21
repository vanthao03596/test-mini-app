import { ReferencePage } from '@/pages/ReferencePage';
import { UserPage } from '@/pages/UserPage';
import { RouteObject } from 'react-router-dom';

const userRouter: RouteObject[] = [
    {
        path: 'user',
        element: <UserPage />,
    },
    {
        path: 'reference',
        element: <ReferencePage />,
    },
];

export default userRouter;
