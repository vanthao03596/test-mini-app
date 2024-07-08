import { Title } from '@/components/ui/Title';
import styles from './LeaderboardPage.module.scss';
import axiosAuth from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { CustomList } from '@/components/ui/CustomList';
import { Avatar, Ellipsis, List } from 'antd-mobile';
import { truncateEthAddress } from '@/utils/truncateEthAddress';
import {
    FluentEmojiFlat1stPlaceMedal,
    FluentEmojiFlat2ndPlaceMedal,
    FluentEmojiFlat3rdPlaceMedal,
} from '@/components/icon';
import { Flex } from '@/components/ui/Flex';

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
};

const LeaderboardPage = () => {
    const getLeaderboard = async () => {
        const res = await axiosAuth.get<LeaderboardResponse>('/leader-boards');
        return res.data;
    };

    const { data } = useQuery({
        queryKey: ['get-leaderboard'],
        queryFn: getLeaderboard,
    });

    return (
        <div className={styles.container}>
            <Title text='Leaderboard' />

            <CustomList className={styles.list}>
                {data?.leader_boards.map((item, index) => (
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
                                        {index + 1}
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

export default LeaderboardPage;
