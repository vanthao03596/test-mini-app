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

type Unit = 'GXP' | 'GXN' | 'REF';

type TabItem = {
    key: string;
    title: string;
    data: LeaderboardResponse | undefined;
    unit: Unit;
};

type TabItemProps = LeaderboardResponse & {
    unit: Unit;
};

const TabItem = (props: TabItemProps) => {
    const { current_rank, leader_boards, unit } = props;

    return (
        <>
            {unit === 'GXP' && <Title text='This month' type='subtitle' />}
            {Number(current_rank) > 0 && <Title text={`Your rank: #${current_rank}`} type='gold' />}

            <CustomList className={styles.list}>
                {leader_boards.map((item, index) => (
                    <List.Item
                        key={index}
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
                            content={`${Number(item.total_mint).toFixed(unit === 'REF' ? 0 : 4)} ${unit}`}
                            className={[0, 1, 2].includes(index) ? styles.amount : ''}
                        />
                    </List.Item>
                ))}
            </CustomList>
        </>
    );
};

const LeaderboardPage = () => {
    const getLeaderboard = async (type?: 'gp' | 'ref') => {
        // Create url
        let url = '/leader-boards';
        if (type) {
            url += `?type=${type}`;
        }

        // Get
        const res = await axiosAuth.get<LeaderboardResponse>(url);
        return res.data;
    };

    const results = useQueries({
        queries: [
            {
                queryKey: ['get-leaderboard-gxp'],
                queryFn: () => getLeaderboard(),
            },
            {
                queryKey: ['get-leaderboard-gemx-token'],
                queryFn: () => getLeaderboard('gp'),
            },
            {
                queryKey: ['get-leaderboard-reference'],
                queryFn: () => getLeaderboard('ref'),
            },
        ],
    });

    const tabItems: TabItem[] = [
        {
            key: 'gxp',
            title: 'GXP',
            data: results[0].data,
            unit: 'GXP',
        },
        {
            key: 'gemx-token',
            title: 'GXN',
            data: results[1].data,
            unit: 'GXN',
        },
        {
            key: 'reference',
            title: 'REF',
            data: results[2].data,
            unit: 'REF',
        },
    ];

    return (
        <div className={styles.container}>
            <Title text='Leaderboard' />

            <Tabs>
                {tabItems.map((item) => (
                    <Tabs.Tab title={item.title} key={item.key}>
                        {item.data && <TabItem {...item.data} unit={item.unit} />}
                    </Tabs.Tab>
                ))}
            </Tabs>
        </div>
    );
};

export default LeaderboardPage;
