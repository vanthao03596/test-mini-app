import { CursorBasedResponse, User } from '@/types/public.types';

enum Language {
    En = 'en',
    Vi = 'vi',
}

type Pivot = {
    research_id: number;
    coin_id: number;
};

type Coin = {
    id: number;
    logo: string;
    slug: string;
    pivot: Pivot;
};

type ResearchCoin = {
    coin: Coin;
};

type ResearchUser = Required<
    Pick<User, 'id' | 'image_path' | 'address' | 'gas_price' | 'mint_gxp_per_second' | 'name'>
>;

export type Research = {
    id: number;
    title: string;
    img_path: string;
    created_at: Date;
    user_id: number;
    dislike_count: number;
    like_count: number;
    fee: null;
    is_fee: number;
    content_short: string;
    slug: string;
    review_count: number;
    language: Language;
    is_featured: number;
    user: ResearchUser;
    research_coin: ResearchCoin[];
};

export type ResearchResponse = CursorBasedResponse & {
    data: Research[];
};
