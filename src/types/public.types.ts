export type User = {
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
    telegram_username: string | undefined;
    nonce: string | null;
    gas_power: number;
    gas_rate_lvl: number;
    last_claim_gxp: string | null;
    gas_price: number;
    mint_gxp_per_second: number;
    next_lvl_gxp: number;
    gxp_earn: string;
    total_read: number;
};

export type CursorBased = {
    next_cursor: string | null;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_cursor: string | null;
    prev_page_url: string | null;
};

export type SocialTask = {
    id: number;
    link: string;
    name: string;
    reward: number;
    social: 'facebook' | 'twitter' | 'tiktok' | 'website' | 'telegram' | 'gemx';
    template_id:
        | 'ViewPageFacebook'
        | 'LikeATweet'
        | 'RetweetTwitter'
        | 'FollowTiktok'
        | 'VisitWebsite'
        | 'JoinTelegram'
        | 'QuoteTweetAndHashTag'
        | 'FollowTwitter'
        | 'DailyCheckin'
        | 'AnswerQuestion'
        | 'ChooseCorrectAnswer'
        | 'SendWalletAddress'
        | 'SendEmail'
        | 'SendUrl'
        | 'SendImage';
    params: {
        answers?: { text: string; is_correct: boolean }[];
        question?: string;
        description?: string;
        [key: string]: any;
    };
};
