import { CustomList } from '@/components/ui/CustomList';
import { Title } from '@/components/ui/Title';
import { DATE_DETAIL_FORMAT_TYPE } from '@/constants/public';
import useGetCompleteTask from '@/hooks/useGetCompleteTask';
import axiosAuth from '@/lib/axios';
import { SocialTask } from '@/types/public.types';
import { useQuery } from '@tanstack/react-query';
import { AutoCenter } from 'antd-mobile';
import dayjs from 'dayjs';
import DOMPurify from 'dompurify';
import { useParams } from 'react-router-dom';
import { TaskItem } from './components/TaskItem';
import styles from './QuestDetailPage.module.scss';

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

const useGetDetailQuest = (questId?: string) => {
    return useQuery({
        queryKey: ['get-detail-quest'],
        queryFn: async (): Promise<QuestDetailResponse> => {
            const res = await axiosAuth.get(`/campaigns/${questId}`);
            return res.data;
        },
    });
};

const QuestDetailPage = () => {
    const { questId } = useParams();
    const { data: questData, isLoading: isQuestLoading } = useGetDetailQuest(questId);
    const { data: taskCompleteData, isLoading: isCompleteTaskLoading } = useGetCompleteTask(questId);
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
                    let complete = false;
                    if (item.template_id === 'DailyCheckin' && !taskCompleteData?.can_checkin) {
                        complete = true;
                    } else if (taskCompleteData?.completed_task_id.includes(item.id)) {
                        complete = true;
                    }
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
