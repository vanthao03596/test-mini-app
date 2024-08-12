import { CustomList } from '@/components/ui/CustomList';
import { Title } from '@/components/ui/Title';
import { DATE_DETAIL_FORMAT_TYPE } from '@/constants/public';
import axiosAuth from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { AutoCenter } from 'antd-mobile';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import { SocialTask } from '../SocialTaskPage/SocialTaskPage';
import { TaskItem } from './components/TaskItem';
import styles from './QuestDetailPage.module.scss';
import DOMPurify from 'dompurify';

type QuestDetailResponse = {
    id: number;
    name: string;
    image: string;
    description: string;
    start_date: Date;
    end_date: Date;
    owner_id: number;
    category_id: number;
    rewards: {
        params: {
            token_type: string;
            number_of_rewards: number;
            total_token_amount: number;
        };
        template_id: string;
    }[];
    status: string;
    views: number;
    slug: string;
    tasks: SocialTask[];
};

type TaskCompleteResponse = {
    completed_task_id: number[];
};

const QuestDetailPage = () => {
    const { questId } = useParams();

    const getDetailQuest = async () => {
        const res = await axiosAuth.get<QuestDetailResponse>(`/campaigns/${questId}`);
        return res.data;
    };

    const getCompleteTask = async () => {
        const res = await axiosAuth.get<TaskCompleteResponse>('/completed-task');
        return res.data;
    };

    const { data: questData, isLoading: isQuestLoading } = useQuery({
        queryKey: ['get-detail-quest'],
        queryFn: getDetailQuest,
    });

    const { data: taskCompleteData, isLoading: isCompleteTaskLoading } = useQuery({
        queryKey: ['get-complete-social-task'],
        queryFn: getCompleteTask,
    });

    const isOngoing = dayjs().isBefore(questData?.end_date);

    if (isQuestLoading || isCompleteTaskLoading) return;

    return (
        <div className={styles.container}>
            <Title text='Quest Detail' />
            <Title type='subtitle' text={isOngoing ? 'Ongoing' : 'Finished'} />
            <AutoCenter className={styles.time}>
                {dayjs(questData?.start_date).format(DATE_DETAIL_FORMAT_TYPE)} -{' '}
                {dayjs(questData?.end_date).format(DATE_DETAIL_FORMAT_TYPE)}
            </AutoCenter>

            <CustomList>
                {questData?.tasks.map((item) => {
                    const complete = taskCompleteData?.completed_task_id.includes(item.id);
                    return <TaskItem key={item.id} complete={complete} isOngoing={isOngoing} {...item} />;
                })}
            </CustomList>

            {/* Description */}
            {questData?.description && (
                <>
                    <div
                        className={styles.description}
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(questData.description) }}
                    ></div>
                </>
            )}
        </div>
    );
};

export default QuestDetailPage;
