import { TablerCrown, TablerCrownOff } from '@/components/icon';
import { CustomList } from '@/components/ui/CustomList';
import useUser from '@/hooks/useUser';
import { truncateEthAddress } from '@/utils/truncateEthAddress';
import { Avatar, Ellipsis, Grid, List, Popover, Space } from 'antd-mobile';
import clsx from 'clsx';
import styles from './NetworkUser.module.scss';
import { Flex } from '@/components/ui/Flex';

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
                            <Popover
                                mode='dark'
                                content={account?.user.is_vip ? 'VIP' : 'NOT VIP'}
                                trigger='click'
                                placement='top'
                            >
                                {account?.user.is_vip ? (
                                    <TablerCrown className={clsx(styles.icon, styles.active)} />
                                ) : (
                                    <TablerCrownOff className={clsx(styles.icon, styles.inactive)} />
                                )}
                            </Popover>
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
