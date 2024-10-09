import axiosAuth from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

type TaskCompleteResponse = {
    completed_task_id: number[];
};

const useGetCompleteTask = () => {
    return useQuery({
        queryKey: ['get-complete-social-task'],
        queryFn: async (): Promise<TaskCompleteResponse> => {
            const res = await axiosAuth.get('/completed-task');
            return res.data;
        },
    });
};

export default useGetCompleteTask;
