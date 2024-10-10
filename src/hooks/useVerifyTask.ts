import axiosAuth from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ImageUploadItem, Toast } from 'antd-mobile';
import { AxiosError } from 'axios';

const useVerifyTask = (
    taskId: number,
    data: string,
    username: string,
    fileList: ImageUploadItem[],
    callback: () => void,
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['verify-social-task'],
        mutationFn: async () => {
            const res = await axiosAuth.post('/verify-task', {
                task_id: taskId,
                data: fileList[0]?.url || data,
                username: username,
            });

            return res.data;
        },
        onSuccess: async (data) => {
            if (data.status) {
                await queryClient.invalidateQueries({ queryKey: ['get-complete-social-task'] });
                Toast.show({
                    icon: 'success',
                    content: 'Task completed',
                });
                callback();
            } else {
                Toast.show({
                    icon: 'fail',
                    content: data.message,
                });
            }
        },
        onError: (error) => {
            if (error instanceof AxiosError) {
                Toast.show({
                    icon: 'fail',
                    content: error.response?.data.message,
                });
            }
        },
    });
};
export default useVerifyTask;
