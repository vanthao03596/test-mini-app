import axiosAuth from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

type Coin = {
    coin: {
        id: number;
        logo: string;
        name: string;
        percent_change_24h: string;
        price: string;
        slug: string;
    };
    coin_id: number;
    id: number;
    is_cmc: number;
    rank: number;
};

type BiggestGainer = Coin & {
    type: 'biggest_gainers';
};

type BiggestLoser = Coin & {
    type: 'biggest_losers';
};

type Trending = Coin & {
    type: 'trending';
};

type TrendingResponse = {
    biggest_gainers: BiggestGainer[];
    biggest_losers: BiggestLoser[];
    trending: Trending[];
};

const useTrending = () => {
    const getTrending = async () => {
        const res = await axiosAuth.get<TrendingResponse>('/trendings');
        return res.data;
    };

    const trendingQuery = useQuery({
        queryKey: ['get-trending'],
        queryFn: getTrending,
    });

    return trendingQuery;
};

export default useTrending;
