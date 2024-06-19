import { Navigate, Outlet } from 'react-router-dom';
import { CustomTabBar } from '../../components/layout/CustomTabBar';
import { SafeArea } from 'antd-mobile';

const ProtectedRoutes = () => {
    const user = 'test';

    return user ? (
        <>
            <Outlet />
            <CustomTabBar />
            <SafeArea position='bottom' />
        </>
    ) : (
        <Navigate to={'/login'} replace />
    );
};

export default ProtectedRoutes;
