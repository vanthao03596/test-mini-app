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
    telegram_username: string;
    nonce: string | null;
    gas_power: number;
    gas_rate_lvl: number;
    last_claim_gxp: string | null;
    gas_price: number;
    mint_gxp_per_second: number;
};

export type CursorBasedResponse = {
    next_cursor: string | null;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_cursor: string | null;
    prev_page_url: string | null;
};
