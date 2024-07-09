import { RouteObject } from 'react-router-dom';

const earnRouter: RouteObject[] = [
    {
        path: 'earn',
        lazy: async () => {
            const { EarnPage } = await import('@/pages/EarnPage');
            return { Component: EarnPage };
        },
    },
    {
        path: '/earn/quest',
        lazy: async () => {
            const { QuestPage } = await import('@/pages/QuestPage');
            return { Component: QuestPage };
        },
    },
    {
        path: '/earn/social-task',
        lazy: async () => {
            const { SocialTaskPage } = await import('@/pages/SocialTaskPage');
            return { Component: SocialTaskPage };
        },
    },
    {
        path: '/earn/leaderboard',
        lazy: async () => {
            const { LeaderboardPage } = await import('@/pages/LeaderboardPage');
            return { Component: LeaderboardPage };
        },
    },
    {
        path: 'booster',
        lazy: async () => {
            const { BoosterPage } = await import('@/pages/BoosterPage');
            return { Component: BoosterPage };
        },
    },
];

export default earnRouter;
