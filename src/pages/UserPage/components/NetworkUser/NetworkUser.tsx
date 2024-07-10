import { CustomList } from '@/components/ui/CustomList';
import { Flex } from '@/components/ui/Flex';
import useUser from '@/hooks/useUser';
import { truncateEthAddress } from '@/utils/truncateEthAddress';
import { Avatar, Ellipsis, Grid, List, Space } from 'antd-mobile';
import styles from './NetworkUser.module.scss';

const NetworkUser = () => {
    const account = useUser();

    return (
        <div className={styles.container}>
            <CustomList className={styles.list}>
                {/* Top */}
                <List.Item
                    prefix={<Avatar src={account?.user.image_path || ''} />}
                    description={`Level ${account?.user.gas_rate_lvl}`}
                    extra={
                        <Flex align='center'>
                            {account?.user.is_vip ? <div className={styles.vip}>VIP</div> : 'NOT VIP'}
                        </Flex>
                    }
                    className={styles.listItem}
                >
                    <Ellipsis content={truncateEthAddress(account?.user.address)} />
                </List.Item>

                {/* Bottom */}
                <Grid columns={2} gap={8} className={styles.grid}>
                    <Grid.Item className={styles.gridItem}>
                        <Space direction='vertical'>
                            <div className={styles.title}>Follower</div>
                            <div className={styles.description}>{account?.user.follower}</div>
                        </Space>
                    </Grid.Item>
                    <Grid.Item className={styles.gridItem}>
                        <Space direction='vertical'>
                            <div className={styles.title}>Following</div>
                            <div className={styles.description}>{account?.user.following}</div>
                        </Space>
                    </Grid.Item>
                </Grid>
            </CustomList>
        </div>
    );
};

export default NetworkUser;
