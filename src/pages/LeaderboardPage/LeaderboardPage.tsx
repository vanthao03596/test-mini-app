import {
    FluentEmojiFlat1stPlaceMedal,
    FluentEmojiFlat2ndPlaceMedal,
    FluentEmojiFlat3rdPlaceMedal,
    TablerCalendarMonth,
} from '@/components/icon';
import { CustomList } from '@/components/ui/CustomList';
import { Flex } from '@/components/ui/Flex';
import { Title } from '@/components/ui/Title';
import { DATE_ONLY_FORMAT_TYPE } from '@/constants/public';
import axiosAuth from '@/lib/axios';
import { truncateEthAddress } from '@/utils/truncateEthAddress';
import { useQueries } from '@tanstack/react-query';
import { Avatar, CalendarPicker, Ellipsis, List, Tabs } from 'antd-mobile';
import dayjs from 'dayjs';
import { useState } from 'react';
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

function formatTwoDigit(n: number) {
    return n < 10 ? '0' + n : '' + n;
}

const LeaderboardPage = () => {
    const [val, setVal] = useState<[Date, Date] | null>(null);
    const [visible, setVisible] = useState<boolean>(false);

    const getLeaderboard = async (type?: 'gp' | 'ref') => {
        let startDate = '';
        let endDate = '';

        // Format date
        if (val && val.length > 0) {
            const sDate = new Date(val[0]);
            const eDate = new Date(val[1]);
            startDate = `${sDate.getFullYear()}-${formatTwoDigit(sDate.getMonth())}-${formatTwoDigit(sDate.getDate())}`;
            endDate = `${eDate.getFullYear()}-${formatTwoDigit(eDate.getMonth())}-${formatTwoDigit(eDate.getDate())}`;
        }

        // Create url
        let url = `/leader-boards?start_date=${startDate}&end_date=${endDate}`;
        if (type) {
            url += `&type=${type}`;
        }

        // Get
        const res = await axiosAuth.get<LeaderboardResponse>(url);
        return res.data;
    };

    const results = useQueries({
        queries: [
            {
                queryKey: ['get-leaderboard-gxp', val],
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

            <CalendarPicker
                visible={visible}
                max={new Date()}
                selectionMode='range'
                value={val}
                onClose={() => setVisible(false)}
                onMaskClick={() => setVisible(false)}
                onChange={(val) => {
                    setVal(val);
                }}
            />

            <Tabs>
                {tabItems.map((item) => (
                    <Tabs.Tab title={item.title} key={item.key}>
                        {item.data && (
                            <>
                                {/* Filter by date */}
                                {item.unit === 'GXP' && (
                                    <Flex
                                        align='center'
                                        justify='center'
                                        onClick={() => setVisible(true)}
                                        className={styles.date}
                                    >
                                        <Flex align='center' justify='center' className={styles.iconContainer}>
                                            <TablerCalendarMonth />
                                        </Flex>

                                        {val && val.length > 0 ? (
                                            <div>
                                                {dayjs(val[0]).format(DATE_ONLY_FORMAT_TYPE)}
                                                {' - '}
                                                {dayjs(val[1]).format(DATE_ONLY_FORMAT_TYPE)}
                                            </div>
                                        ) : (
                                            'All time'
                                        )}
                                    </Flex>
                                )}

                                {/* Current rank */}
                                {Number(item.data.current_rank) > 0 && (
                                    <Title text={`Your rank: #${item.data.current_rank}`} type='gold' />
                                )}

                                {/* List */}
                                <CustomList className={styles.list}>
                                    {item.data.leader_boards.map((i, index) => (
                                        <List.Item
                                            key={index}
                                            prefix={<Avatar src={i.user.image_path || ''} />}
                                            description={truncateEthAddress(i.user.address)}
                                            extra={
                                                <Flex align='center'>
                                                    {index === 0 ? (
                                                        <FluentEmojiFlat1stPlaceMedal className={styles.icon} />
                                                    ) : index === 1 ? (
                                                        <FluentEmojiFlat2ndPlaceMedal className={styles.icon} />
                                                    ) : index === 2 ? (
                                                        <FluentEmojiFlat3rdPlaceMedal className={styles.icon} />
                                                    ) : (
                                                        <Flex
                                                            align='center'
                                                            justify='center'
                                                            className={styles.normalRank}
                                                        >
                                                            #{index + 1}
                                                        </Flex>
                                                    )}
                                                </Flex>
                                            }
                                        >
                                            <Ellipsis
                                                content={`${Number(i.total_mint).toFixed(
                                                    item.unit === 'REF' ? 0 : 4
                                                )} ${item.unit}`}
                                                className={[0, 1, 2].includes(index) ? styles.amount : ''}
                                            />
                                        </List.Item>
                                    ))}
                                </CustomList>
                            </>
                        )}
                    </Tabs.Tab>
                ))}
            </Tabs>
        </div>
    );
};

export default LeaderboardPage;
