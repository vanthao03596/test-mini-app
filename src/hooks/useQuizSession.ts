import axiosAuth from '@/lib/axios';
import { QuizSessionResponse } from '@/pages/QuizDetailPage/QuizDetailPage.types';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const useQuizSession = () => {
    const { quizId } = useParams();

    const getSession = async () => {
        const res = await axiosAuth.get<QuizSessionResponse>(`/quizz/${quizId}/session`);
        return res.data;
    };

    return useQuery({
        queryKey: ['get-quiz-session', quizId],
        queryFn: getSession,
        staleTime: 0,
    });
};

export default useQuizSession;
