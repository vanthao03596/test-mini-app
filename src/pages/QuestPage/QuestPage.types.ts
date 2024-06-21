type QuestsData = {
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
};

export type QuestsResponse = {
    current_page: number;
    data: QuestsData[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
        url?: string;
        label: string;
        active: boolean;
    }[];
    next_page_url?: string;
    path: string;
    per_page: number;
    prev_page_url?: string;
    to: number;
    total: number;
};

export type QuestCardProps = {
    image: string;
    views: number;
    title: string;
    endDate: Date;
    rewards: QuestsData['rewards'];
    slug: string;
};
