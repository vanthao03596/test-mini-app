import { Navigate, Outlet } from 'react-router-dom';
import { CustomTabBar } from '../../components/layout/CustomTabBar';

const ProtectedRoutes = () => {
    const user = '123';

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
