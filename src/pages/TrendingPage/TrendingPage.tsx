import { TablerChevronRight } from '@/components/icon';
import { CustomList } from '@/components/ui/CustomList';
import { Flex } from '@/components/ui/Flex';
import { Title } from '@/components/ui/Title';
import useTrending from '@/hooks/useTrending';
import { Avatar, Ellipsis, List, Space, Tag } from 'antd-mobile';
import { Link } from 'react-router-dom';
import styles from './TrendingPage.module.scss';
import { formatUSD } from '@/utils/formatCurrency';

const TrendingPage = () => {
    const { data } = useTrending();

    return (
        <div className={styles.container}>
            <Title text='trending' />
            <CustomList>
                {data?.trending.slice(0, 50).map((item) => (
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
