import { CustomList } from '@/components/ui/CustomList';
import { Title } from '@/components/ui/Title';
import axiosAuth from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { Avatar, Ellipsis, List, Tag } from 'antd-mobile';
import { Link } from 'react-router-dom';
import styles from './TrendingPage.module.scss';

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

const formatUSD = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,

    // https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-strings
    // These options are needed to round to whole numbers if that's what you want.
    // minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    // maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

const TrendingPage = () => {
    const getTrending = async () => {
        const res = await axiosAuth.get<TrendingResponse>('/trendings');
        return res.data;
    };

    const { data } = useQuery({
        queryKey: ['get-trending'],
        queryFn: getTrending,
    });

    return (
        <div className={styles.container}>
            <Title text='trending' />
            <CustomList>
                {data?.trending.slice(0, 10).map((item) => (
                    <Link key={item.id} to={`https://gemx.io/coin/${item.coin.slug}`} target='_blank'>
                        <List.Item
                            prefix={<Avatar src={item.coin.logo} />}
                            description={formatUSD.format(Number(item.coin.price))}
                            extra={
                                <Tag
                                    color={Number(item.coin.percent_change_24h) > 0 ? 'success' : 'danger'}
                                    fill='outline'
                                >
                                    {Number(item.coin.percent_change_24h) > 0 && '+'}
                                    {Number(item.coin.percent_change_24h).toFixed(2)}
                                </Tag>
                            }
                        >
                            <Ellipsis content={item.coin.name} />
                        </List.Item>
                    </Link>
                ))}
            </CustomList>

            {/* Read more */}
            <div className={styles.more}>
                <Link to={'https://gemx.io/trending'} target='_blank'>
                    View more
                </Link>
            </div>
        </div>
    );
};

export default TrendingPage;
