import { CursorBased } from '@/types/public.types';

export type Quest = {
    id: number;
    name: string;
    image: string;
    description: string;
    start_date: Date;
    end_date: Date;
    owner_id: number;
    category_id: number;
    rewards: {
        params: {
            token_type: string;
            number_of_rewards: number;
            total_token_amount: number;
        };
        template_id: string;
    }[];
    status: string;
    views: number;
    slug: string;
    participants_count: number;
};

export type QuestsResponse = CursorBased & {
    data: Quest[];
};

export type QuestCardProps = {
    image: string;
    views: number;
    title: string;
    endDate: Date;
    rewards: Quest['rewards'];
    slug: string;
};
