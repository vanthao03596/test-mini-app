import { BoosterPage } from '@/pages/BoosterPage';
import { EarnPage } from '@/pages/EarnPage';
import { LeaderboardPage } from '@/pages/LeaderboardPage';
import { QuestDetailPage } from '@/pages/QuestDetailPage';
import { QuestPage } from '@/pages/QuestPage';
import { SocialTaskPage } from '@/pages/SocialTaskPage';
import { RouteObject } from 'react-router-dom';

const earnRouter: RouteObject[] = [
    {
        path: 'earn',
        element: <EarnPage />,
        // lazy: async () => {
        //     const { EarnPage } = await import('@/pages/EarnPage');
        //     return { Component: EarnPage };
        // },
    },
    {
        path: '/earn/quest',
        element: <QuestPage />,
        // lazy: async () => {
        //     const { QuestPage } = await import('@/pages/QuestPage');
        //     return { Component: QuestPage };
        // },
    },
    {
        path: '/earn/quest/:questId',
        element: <QuestDetailPage />,
        // lazy: async () => {
        //     const { QuestDetailPage } = await import('@/pages/QuestDetailPage');
        //     return { Component: QuestDetailPage };
        // },
    },
    {
        path: '/earn/social-task',
        element: <SocialTaskPage />,
        // lazy: async () => {
        //     const { SocialTaskPage } = await import('@/pages/SocialTaskPage');
        //     return { Component: SocialTaskPage };
        // },
    },
    {
        path: '/earn/leaderboard',
        element: <LeaderboardPage />,
        // lazy: async () => {
        //     const { LeaderboardPage } = await import('@/pages/LeaderboardPage');
        //     return { Component: LeaderboardPage };
        // },
    },
    {
        path: 'booster',
        element: <BoosterPage />,
        // lazy: async () => {
        //     const { BoosterPage } = await import('@/pages/BoosterPage');
        //     return { Component: BoosterPage };
        // },
    },
];

export default earnRouter;
