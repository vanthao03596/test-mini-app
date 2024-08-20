import axiosAuth from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

type WithdrawStatusResponse = {
    can_withdraw: boolean;
    withdraw_percent: number;
    total_earn: string;
    limit_reached: boolean;
};

const useWithdrawStatus = () => {
    const getWithdrawStatus = async () => {
        const res = await axiosAuth.get<WithdrawStatusResponse>('/withdraw-status');
        return res.data;
    };

    return useQuery({
        queryKey: ['get-withdraw-status'],
        queryFn: getWithdrawStatus,
    });
};

export default useWithdrawStatus;
