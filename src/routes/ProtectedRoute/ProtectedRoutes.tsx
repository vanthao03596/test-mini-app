import React from 'react';
import { CustomTabBar } from '../../components/layout/CustomTabBar';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
    const user = 'test';

    return user ? (
        <>
            <Outlet />
            <CustomTabBar />
        </>
    ) : (
        <Navigate to={'/login'} replace />
    );
};

export default ProtectedRoutes;
