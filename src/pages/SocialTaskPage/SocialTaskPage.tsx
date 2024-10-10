import { CustomList } from '@/components/ui/CustomList';
import { Title } from '@/components/ui/Title';
import useGetCompleteTask from '@/hooks/useGetCompleteTask';
import useGetSocialTask from '@/hooks/useGetSocialTask';
import { TaskItem } from './components/TaskItem';
import styles from './SocialTaskPage.module.scss';

const SocialTaskPage = () => {
    const { data: taskData, isLoading: isTaskLoading } = useGetSocialTask();
    const { data: taskCompleteData, isLoading: isCompleteTaskLoading } = useGetCompleteTask();

    if (isTaskLoading || isCompleteTaskLoading) return null;

    return (
        <div className={styles.container}>
            <Title text='Social task' />

            <CustomList>
                {taskData?.tasks.map((item) => {
                    let complete = false;
                    if (item.template_id === 'DailyCheckin' && !taskCompleteData?.can_checkin) {
                        complete = true;
                    } else if (taskCompleteData?.completed_task_id.includes(item.id)) {
                        complete = true;
                    }
                    return <TaskItem key={item.id} complete={complete} {...item} />;
                })}
            </CustomList>
        </div>
    );
};

export default SocialTaskPage;
