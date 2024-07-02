import { TablerChevronRight } from '@/components/icon';
import { CustomList } from '@/components/ui/CustomList';
import { Flex } from '@/components/ui/Flex';
import useTrending from '@/hooks/useTrending';
import { Avatar, Ellipsis, List, Space, Tag } from 'antd-mobile';
import { Link } from 'react-router-dom';
import styles from './TrendingBox.module.scss';

const formatUSD = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,

    // https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-strings
    // These options are needed to round to whole numbers if that's what you want.
    // minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    // maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

const TrendingBox = () => {
    const { data } = useTrending();

    return (
        <div className={styles.container}>
            {/* Title */}
            <Flex justify='space-between' className={styles.title}>
                <div className={styles.text}>Trending</div>
                <div className={styles.action}>
                    <Link to='/trending'>View more</Link>
                </div>
            </Flex>

            {/* List */}
            <CustomList>
                {data?.trending.slice(0, 5).map((item) => (
                    <Link key={item.id} to={`https://gemx.io/coin/${item.coin.slug}`} target='_blank'>
                        <List.Item
                            prefix={<Avatar src={item.coin.logo} />}
                            description={formatUSD.format(Number(item.coin.price))}
                            extra={
                                <Space align='center'>
                                    <Tag
                                        color={Number(item.coin.percent_change_24h) > 0 ? 'success' : 'danger'}
                                        fill='outline'
                                    >
                                        {Number(item.coin.percent_change_24h) > 0 && '+'}
                                        {Number(item.coin.percent_change_24h).toFixed(2)}
                                    </Tag>
                                    <Flex align='center'>
                                        <TablerChevronRight />
                                    </Flex>
                                </Space>
                            }
                        >
                            <Ellipsis content={item.coin.name} />
                        </List.Item>
                    </Link>
                ))}
            </CustomList>
        </div>
    );
};

export default TrendingBox;
