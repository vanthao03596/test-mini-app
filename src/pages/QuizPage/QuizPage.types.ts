import { CursorBased } from '@/types/public.types';
import { Research } from '../ResearchPage/ResearchPage.types';

export type Quiz = {
    id: number;
    research_id: number;
    title: string;
    description: string;
    max_user_join: number;
    price_join: number;
    type_reward: string;
    start_date: Date;
    created_at: Date;
    updated_at: Date;
    research: Research;
};

export type QuizResponse = CursorBased & {
    data: Quiz[];
};
