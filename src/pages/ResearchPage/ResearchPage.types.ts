type User = {
    id: number;
    name: string | null;
    email: string | null;
    email_verified_at: string | null;
    created_at: Date;
    updated_at: Date;
    type: string;
    address: string;
    ref_address: string | null;
    image_path: string | null;
    is_vip: number;
    follower: number;
    following: number;
    can_create_report: number;
    invite_earned: number;
    telegram_id: number;
    telegram_username: string;
    nonce: string | null;
    gas_power: number;
    gas_rate_lvl: number;
    last_claim_gxp: string | null;
    gas_price: number;
    mint_gxp_per_second: number;
};

enum Language {
    En = 'en',
    Vi = 'vi',
}

type Link = {
    url: null | string;
    label: string;
    active: boolean;
};

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

type Research = {
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

export type ResearchResponse = {
    current_page: number;
    data: Research[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Link[];
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: null;
    to: number;
    total: number;
};