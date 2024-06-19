import { Navigate, Outlet } from 'react-router-dom';
import { CustomTabBar } from '../../components/layout/CustomTabBar';

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
