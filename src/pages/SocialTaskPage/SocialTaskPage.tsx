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
    social: string;
};

type SocialTaskResponse = {
    tasks: SocialTask[];
    [key: string]: any;
};

const SocialTaskPage = () => {
    const getSocialTask = async () => {
        const res = await axiosAuth.get<SocialTaskResponse>('/social-task');
        return res.data;
    };

    const { data } = useQuery({
        queryKey: ['get-social-task'],
        queryFn: getSocialTask,
    });

    return (
        <div className={styles.container}>
            <Title text='Social task' />

            <CustomList>
                {data?.tasks.map((item) => (
                    <TaskItem key={item.id} {...item} />
                ))}
            </CustomList>
        </div>
    );
};

export default SocialTaskPage;
