import { LoginPage } from '@/pages/LoginPage';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ProtectedRoutes } from './ProtectedRoute';
import cryptoRouter from './crypto';
import earnRouter from './earn';
import homeRouter from './home';
import userRouter from './user';
import walletRouter from './wallet';

const router = createBrowserRouter([
    {
        path: '/',
        element: <ProtectedRoutes />,
        children: [...homeRouter, ...earnRouter, ...walletRouter, ...cryptoRouter, ...userRouter],
    },
    { path: '/login', element: <LoginPage /> },
    {
        path: '*',
        element: <Navigate to='/' />,
    },
]);

export default router;
