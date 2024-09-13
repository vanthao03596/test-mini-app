import useQuizSession from '@/hooks/useQuizSession';
import { QuizDetail } from './components/QuizDetail';
import { QuizSummary } from './components/QuizSummary';

const QuizDetailPage = () => {
    const { data: sessionData } = useQuizSession();

    if (sessionData?.session === null) return <QuizSummary />;

    return <QuizDetail />;
};

export default QuizDetailPage;
