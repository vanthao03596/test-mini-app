import axiosAuth from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

type TaskCompleteResponse = {
    completed_task_id: number[];
    can_checkin: boolean;
};

const useGetCompleteTask = (id: number | string = 'social') => {
    return useQuery({
        queryKey: ['get-complete-social-task', id],
        queryFn: async (): Promise<TaskCompleteResponse> => {
            const res = await axiosAuth.get('/completed-task', {
                params: {
                    campaign_id: id,
                },
            });
            return res.data;
        },
    });
};

export default useGetCompleteTask;
