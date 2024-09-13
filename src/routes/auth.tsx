import { LoginPage } from '@/pages/LoginPage';
import { VerifyEmailPage } from '@/pages/VerifyEmailPage';
import { RouteObject } from 'react-router-dom';

const authRouter: RouteObject[] = [
    { path: '/verify-email', element: <VerifyEmailPage /> },
    { path: '/login', element: <LoginPage /> },
];

export default authRouter;
