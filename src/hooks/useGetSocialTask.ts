import axiosAuth from '@/lib/axios';
import { SocialTask } from '@/types/public.types';
import { useQuery } from '@tanstack/react-query';

type SocialTaskResponse = {
    tasks: SocialTask[];
    [key: string]: any;
};

const useGetSocialTask = () => {
    return useQuery({
        queryKey: ['get-social-task'],
        queryFn: async (): Promise<SocialTaskResponse> => {
            const res = await axiosAuth.get<SocialTaskResponse>('/social-task');
            return res.data;
        },
    });
};

export default useGetSocialTask;
