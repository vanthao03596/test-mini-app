import { useParams } from 'react-router-dom';
import styles from './QuizLeaderboard.module.scss';
import axiosAuth from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { CustomList } from '@/components/ui/CustomList';
import { Avatar, Ellipsis, List } from 'antd-mobile';
import { Flex } from '@/components/ui/Flex';
import {
    FluentEmojiFlat1stPlaceMedal,
    FluentEmojiFlat2ndPlaceMedal,
    FluentEmojiFlat3rdPlaceMedal,
} from '@/components/icon';
import { User } from '@/types/public.types';
import { Title } from '@/components/ui/Title';
import useQuizSession from '@/hooks/useQuizSession';

type QuizLeaderboardResponse = {
    leader_board: QuizLeaderboard[];
};

type QuizLeaderboard = {
    created_at: Date;
    end_time: Date;
    start_time: Date;
    updated_at: Date;
    duration: number;
    id: number;
    quizz_id: number;
    total_correct: number;
    user_id: number;
    user: User;
};

const QuizLeaderboard = () => {
    const { quizId } = useParams();
    const { data: sessionData } = useQuizSession();

    const getQuizLeaderboard = async () => {
        const res = await axiosAuth.get<QuizLeaderboardResponse>(`/quizz/${quizId}/leader-boards`);
        return res.data;
    };

    const { data } = useQuery({
        queryKey: ['get-quiz-leaderboard'],
        queryFn: getQuizLeaderboard,
    });

    if (!data) return;

    return (
        <div className={styles.container}>
            <Title type='title' text='Quiz rank' />
            <Title type='subtitle' text={`Your correct: ${sessionData?.session?.total_correct}`} />
            <Title type='gold' text={`Your time: ${sessionData?.session?.duration}s`} />

            <CustomList className={styles.list}>
                {data.leader_board.map((item, index) => (
                    <List.Item
                        key={index}
                        prefix={<Avatar src={item.user?.image_path || ''} />}
                        description={`Time: ${item.duration}s`}
                        extra={
                            <Flex align='center'>
                                {index === 0 ? (
                                    <FluentEmojiFlat1stPlaceMedal className={styles.icon} />
                                ) : index === 1 ? (
                                    <FluentEmojiFlat2ndPlaceMedal className={styles.icon} />
                                ) : index === 2 ? (
                                    <FluentEmojiFlat3rdPlaceMedal className={styles.icon} />
                                ) : (
                                    <Flex align='center' justify='center' className={styles.normalRank}>
                                        #{index + 1}
                                    </Flex>
                                )}
                            </Flex>
                        }
                    >
                        <Ellipsis
                            content={`Correct: ${item.total_correct}`}
                            className={[0, 1, 2].includes(index) ? styles.amount : ''}
                        />
                    </List.Item>
                ))}
            </CustomList>
        </div>
    );
};

export default QuizLeaderboard;
