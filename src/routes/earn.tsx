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
        path: 'booster',
        lazy: async () => {
            const { BoosterPage } = await import('@/pages/BoosterPage');
            return { Component: BoosterPage };
        },
    },
    {
        path: 'quest',
        lazy: async () => {
            const { QuestPage } = await import('@/pages/QuestPage');
            return { Component: QuestPage };
        },
    },
];

export default earnRouter;
