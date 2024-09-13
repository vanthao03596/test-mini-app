import axiosAuth from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { QuizDetail } from './components/QuizDetail';
import { QuizSummary } from './components/QuizSummary';
import { QuizSessionResponse } from './QuizDetailPage.types';

const QuizDetailPage = () => {
    const { quizId } = useParams();

    const getSession = async () => {
        const res = await axiosAuth.get<QuizSessionResponse>(`/quizz/${quizId}/session`);
        return res.data;
    };

    const { data: sessionData } = useQuery({
        queryKey: ['get-quiz-session'],
        queryFn: getSession,
    });

    if (sessionData?.session === null) return <QuizSummary />;

    return <QuizDetail />;
};

export default QuizDetailPage;
