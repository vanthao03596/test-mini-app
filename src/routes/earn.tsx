import { BoosterPage } from '@/pages/BoosterPage';
import { EarnPage } from '@/pages/EarnPage';
import { LeaderboardPage } from '@/pages/LeaderboardPage';
import { QuestDetailPage } from '@/pages/QuestDetailPage';
import { QuestPage } from '@/pages/QuestPage';
import QuizPage from '@/pages/QuizPage/QuizPage';
import { SocialTaskPage } from '@/pages/SocialTaskPage';
import { RouteObject } from 'react-router-dom';

const earnRouter: RouteObject[] = [
    {
        path: 'earn',
        element: <EarnPage />,
    },
    {
        path: 'earn/quest',
        element: <QuestPage />,
    },
    {
        path: 'earn/quest/:questId',
        element: <QuestDetailPage />,
    },
    {
        path: 'earn/social-task',
        element: <SocialTaskPage />,
    },
    {
        path: 'earn/leaderboard',
        element: <LeaderboardPage />,
    },
    {
        path: 'earn/quiz',
        element: <QuizPage />,
    },
    {
        path: 'booster',
        element: <BoosterPage />,
    },
];

export default earnRouter;
