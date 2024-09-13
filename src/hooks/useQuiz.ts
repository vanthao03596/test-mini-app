import axiosAuth from '@/lib/axios';
import { QuizDetailResponse } from '@/pages/QuizDetailPage/QuizDetailPage.types';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const useQuiz = () => {
    const { quizId } = useParams();

    const getQuiz = async () => {
        const res = await axiosAuth.get<QuizDetailResponse>(`quizz/${quizId}`);
        return res.data;
    };

    return useQuery({
        queryKey: ['get-quiz'],
        queryFn: getQuiz,
    });
};

export default useQuiz;
