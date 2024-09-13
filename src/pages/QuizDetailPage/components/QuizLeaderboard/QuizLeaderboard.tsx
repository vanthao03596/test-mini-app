import { useParams } from 'react-router-dom';
import styles from './QuizLeaderboard.module.scss';
import axiosAuth from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

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
};

const QuizLeaderboard = () => {
    const { quizId } = useParams();

    const getQuizLeaderboard = async () => {
        const res = await axiosAuth.get<QuizLeaderboardResponse>(`/quizz/${quizId}/leader-boards`);
        return res.data;
    };

    const { data } = useQuery({
        queryKey: ['get-quiz-leaderboard'],
        queryFn: getQuizLeaderboard,
    });

    if (!data) return;

    return <div className={styles.container}></div>;
};

export default QuizLeaderboard;
