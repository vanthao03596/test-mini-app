import { MintPage } from '@/pages/MintPage';
import { RouteObject } from 'react-router-dom';

const homeRouter: RouteObject[] = [
    {
        index: true,
        element: <MintPage />,
    },
];

export default homeRouter;
