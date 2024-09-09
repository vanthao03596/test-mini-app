import {
    FluentEmojiFlat1stPlaceMedal,
    FluentEmojiFlat2ndPlaceMedal,
    FluentEmojiFlat3rdPlaceMedal,
} from '@/components/icon';
import { CustomList } from '@/components/ui/CustomList';
import { Flex } from '@/components/ui/Flex';
import { Title } from '@/components/ui/Title';
import axiosAuth from '@/lib/axios';
import { truncateEthAddress } from '@/utils/truncateEthAddress';
import { useQueries } from '@tanstack/react-query';
import { Avatar, Ellipsis, List, Tabs } from 'antd-mobile';
import styles from './LeaderboardPage.module.scss';

type Leaderboard = {
    total_mint: string;
    user_id: number;
    user: {
        address: string;
        email: string;
        gas_price: number;
        id: number;
        image_path: string;
        mint_gxp_per_second: number;
        name: string;
    };
};

type LeaderboardResponse = {
    leader_boards: Leaderboard[];
    current_rank: number;
};

type TabItemProps = LeaderboardResponse;

const TabItem = (props: TabItemProps) => {
    const { current_rank, leader_boards } = props;

    return (
        <div className={styles.tabItem}>
            <Title text={`Your rank: #${current_rank}`} type='gold' />

            <CustomList className={styles.list}>
                {leader_boards.map((item, index) => (
                    <List.Item
                        key={item.user_id}
                        prefix={<Avatar src={item.user.image_path || ''} />}
                        description={truncateEthAddress(item.user.address)}
                        extra={
                            <Flex align='center'>
                                {index === 0 ? (
                                    <FluentEmojiFlat1stPlaceMedal className={styles.icon} />
                                ) : index === 1 ? (
                                    <FluentEmojiFlat2ndPlaceMedal className={styles.icon} />
                                ) : index === 2 ? (
                                    <FluentEmojiFlat3rdPlaceMedal className={styles.icon} />
                                ) : (
                                    <Flex align='center' justify='center' className={styles.normalRank}>
                                        #{index + 1}
                                    </Flex>
                                )}
                            </Flex>
                        }
                    >
                        <Ellipsis
                            content={`${Number(item.total_mint).toFixed(4)} GXP`}
                            className={[0, 1, 2].includes(index) ? styles.amount : ''}
                        />
                    </List.Item>
                ))}
            </CustomList>
        </div>
    );
};

const LeaderboardPage = () => {
    const getLeaderboard = async () => {
        const res = await axiosAuth.get<LeaderboardResponse>('/leader-boards');
        return res.data;
    };

    const results = useQueries({
        queries: [
            {
                queryKey: ['get-leaderboard-gxp'],
                queryFn: getLeaderboard,
            },
            {
                queryKey: ['get-leaderboard-gemx-token'],
                queryFn: getLeaderboard,
            },
            {
                queryKey: ['get-leaderboard-reference'],
                queryFn: getLeaderboard,
            },
        ],
    });

    return (
        <div className={styles.container}>
            <Title text='Leaderboard' />
            <Title text='This month' type='subtitle' />

            {results && (
                <Tabs>
                    <Tabs.Tab title='GXP' key='gxp'>
                        {results[0].data && <TabItem {...results[0].data} />}
                    </Tabs.Tab>
                    <Tabs.Tab title='Gemx Token' key='gemx-token'>
                        {results[1].data && <TabItem {...results[1].data} />}
                    </Tabs.Tab>
                    <Tabs.Tab title='Reference' key='reference'>
                        {results[2].data && <TabItem {...results[2].data} />}
                    </Tabs.Tab>
                </Tabs>
            )}
        </div>
    );
};

export default LeaderboardPage;
