import { TablerChevronRight } from '@/components/icon';
import { CustomList } from '@/components/ui/CustomList';
import { Flex } from '@/components/ui/Flex';
import useTrending from '@/hooks/useTrending';
import { Avatar, Ellipsis, List, Space, Tag } from 'antd-mobile';
import { Link } from 'react-router-dom';
import styles from './TrendingBox.module.scss';
import { formatUSD } from '@/utils/formatCurrency';

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
                {data?.trending?.slice(0, 5).map((item) => (
                    <Link key={item.id} to={`https://gemx.io/coin/${item.coin.slug}`} target='_blank'>
                        <List.Item
                            prefix={<Avatar src={item.coin.logo} />}
                            description={formatUSD(Number(item.coin.price))}
                            extra={
                                <Space align='center'>
                                    <Tag
                                        color={Number(item.coin.percent_change_24h) > 0 ? 'success' : 'danger'}
                                        fill='outline'
                                    >
                                        {Number(item.coin.percent_change_24h) > 0 && '+'}
                                        {Number(item.coin.percent_change_24h) + '%'}
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
