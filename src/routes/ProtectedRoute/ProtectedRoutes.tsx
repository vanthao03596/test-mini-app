import axiosAuth from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { Navigate, Outlet } from 'react-router-dom';
import { CustomTabBar } from '../../components/layout/CustomTabBar';

interface GetUserInfoResponse {
    user: {
        id: number;
        name: string;
        email: string;
        email_verified_at: string;
        created_at: Date;
        updated_at: Date;
        type: string;
        address: string;
        ref_address: string;
        image_path: string;
        is_vip: number;
        follower: number;
        following: number;
        can_create_report: number;
        invite_earned: number;
        telegram_id: number;
        telegram_username: string;
        nonce: string;
        gas_power: number;
        gas_rate_lvl: number;
        last_claim_gxp: Date;
        gas_price: number;
    };
}

const ProtectedRoutes = () => {
    const getUser = async () => {
        const res = await axiosAuth.get<GetUserInfoResponse>('/user/info');
        return res.data;
    };

    const { data } = useQuery({
        queryKey: ['get-user'],
        queryFn: getUser,
        staleTime: 0,
    });

    if (!data) return null;

    return data.user ? (
        <>
            <Outlet />
            <CustomTabBar />
        </>
    ) : (
        <Navigate to={'/login'} replace />
    );
};

export default ProtectedRoutes;
