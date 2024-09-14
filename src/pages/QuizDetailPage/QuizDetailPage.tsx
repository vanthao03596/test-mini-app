import useQuizSession from '@/hooks/useQuizSession';
import { QuizDetail } from './components/QuizDetail';
import { QuizSummary } from './components/QuizSummary';
import { QuizLeaderboard } from './components/QuizLeaderboard';
import { useState } from 'react';

const QuizDetailPage = () => {
    const { data: sessionData } = useQuizSession();
    const [isDone, setIsDone] = useState<boolean>(false);

    if (!sessionData) return;

    if (sessionData.session === null) return <QuizSummary />;

    if (sessionData.session.end_time && !isDone) return <QuizLeaderboard />;

    return <QuizDetail isDone={isDone} setIsDone={setIsDone} />;
};

export default QuizDetailPage;
