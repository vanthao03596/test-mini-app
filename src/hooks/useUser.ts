import axiosAuth from '@/lib/axios';
import { User } from '@/types/public.types';
import { useQuery } from '@tanstack/react-query';

type UserResponse = {
    user: User;
};

const useUser = () => {
    const getResearch = async () => {
        const res = await axiosAuth.get<UserResponse>('/user/info');
        return res.data;
    };

    const { data: account } = useQuery({
        queryKey: ['get-user-info'],
        queryFn: getResearch,
    });

    return account;
};

export default useUser;
