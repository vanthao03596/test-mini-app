import { CustomList } from '@/components/ui/CustomList';
import { Title } from '@/components/ui/Title';
import axiosAuth from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { TaskItem } from './components/TaskItem';
import styles from './SocialTaskPage.module.scss';

export type SocialTask = {
    id: number;
    link: string;
    name: string;
    reward: number;
    social: 'facebook' | 'twitter' | 'tiktok' | 'website' | 'telegram' | 'gemx';
    template_id:
        | 'ViewPageFacebook'
        | 'LikeATweet'
        | 'RetweetTwitter'
        | 'FollowTiktok'
        | 'VisitWebsite'
        | 'JoinTelegram'
        | 'QuoteTweetAndHashTag'
        | 'FollowTwitter'
        | 'DailyCheckin'
        | 'AnswerQuestion'
        | 'ChooseCorrectAnswer'
        | 'SendWalletAddress'
        | 'SendEmail'
        | 'SendUrl'
        | 'UploadImage';
    params: {
        answers?: { text: string; is_correct: boolean }[];
        question?: string;
        description?: string;
        [key: string]: any;
    };
};

type SocialTaskResponse = {
    tasks: SocialTask[];
    [key: string]: any;
};

type TaskCompleteResponse = {
    completed_task_id: number[];
};

const SocialTaskPage = () => {
    const getSocialTask = async () => {
        const res = await axiosAuth.get<SocialTaskResponse>('/social-task');
        return res.data;
    };

    const getCompleteTask = async () => {
        const res = await axiosAuth.get<TaskCompleteResponse>('/completed-task');
        return res.data;
    };

    const { data: taskData, isLoading: isTaskLoading } = useQuery({
        queryKey: ['get-social-task'],
        queryFn: getSocialTask,
    });

    const { data: taskCompleteData, isLoading: isCompleteTaskLoading } = useQuery({
        queryKey: ['get-complete-social-task'],
        queryFn: getCompleteTask,
    });

    if (isTaskLoading || isCompleteTaskLoading) return null;

    return (
        <div className={styles.container}>
            <Title text='Social task' />

            <CustomList>
                {taskData?.tasks.map((item) => {
                    const complete = taskCompleteData?.completed_task_id.includes(item.id);
                    return <TaskItem key={item.id} complete={complete} {...item} />;
                })}
            </CustomList>
        </div>
    );
};

export default SocialTaskPage;
