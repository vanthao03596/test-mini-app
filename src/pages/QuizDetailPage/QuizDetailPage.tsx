import useQuizSession from '@/hooks/useQuizSession';
import { QuizDetail } from './components/QuizDetail';
import { QuizSummary } from './components/QuizSummary';
import { QuizLeaderboard } from './components/QuizLeaderboard';

const QuizDetailPage = () => {
    const { data: sessionData } = useQuizSession();

    if (!sessionData) return;

    if (sessionData.session === null) return <QuizSummary />;

    if (sessionData.session.end_time) return <QuizLeaderboard />;

    return <QuizDetail />;
};

export default QuizDetailPage;
