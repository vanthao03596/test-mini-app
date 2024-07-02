import { Title } from '@/components/ui/Title';
import styles from './ReferencePage.module.scss';
import { Avatar, List, Space, Tabs } from 'antd-mobile';
import useReference from '@/hooks/useReference';
import { Flex } from '@/components/ui/Flex';
import { truncateEthAddress } from '@/utils/truncateEthAddress';
import { TablerCrown } from '@/components/icon';
import { User } from '@/types/public.types';
import { CustomList } from '@/components/ui/CustomList';

type ListItemProps = User;

const ListItem = (props: ListItemProps) => {
    const { id, image_path, telegram_username, address, gas_rate_lvl, is_vip } = props;

    return (
        <List.Item key={id} className={styles.item}>
            <Flex justify='space-between'>
                {/* Left */}
                <Space align='center'>
                    <Avatar src={image_path || ''} className={styles.image} />
                    <Flex direction='column' justify='flex-start'>
                        <div className={styles.name}>{telegram_username}</div>
                        <div className={styles.address}>{truncateEthAddress(address)}</div>
                    </Flex>
                </Space>

                {/* Right */}
                <Flex align='flex-end' justify='space-between' direction='column'>
                    <div className={styles.amount}>Level {gas_rate_lvl}</div>
                    {!!is_vip && (
                        <Space align='center' className={styles.vip}>
                            <div>VIP</div>
                            <Flex align='center'>
                                <TablerCrown className={styles.icon} />
                            </Flex>
                        </Space>
                    )}
                </Flex>
            </Flex>
        </List.Item>
    );
};

const ReferencePage = () => {
    const { listF1, listF2 } = useReference();

    return (
        <div className={styles.container}>
            {/* Title */}
            <Title text='List' hasBack />

            {/* List */}
            <Tabs defaultActiveKey='f1'>
                {/* Tab F1 */}
                <Tabs.Tab title={`F1 ${listF1 ? `(${listF1.length})` : ''}`} key='f1'>
                    {listF1 && listF1.length > 0 && (
                        <CustomList className={styles.list}>
                            {listF1?.map((item) => (
                                <ListItem {...item} />
                            ))}
                        </CustomList>
                    )}
                </Tabs.Tab>

                {/* Tab F2 */}
                <Tabs.Tab title={`F2 ${listF2 ? `(${listF2.length})` : ''}`} key='f2'>
                    {listF2 && listF2.length > 0 && (
                        <List className={styles.list}>
                            {listF2?.map((item) => (
                                <ListItem {...item} />
                            ))}
                        </List>
                    )}
                </Tabs.Tab>
            </Tabs>
        </div>
    );
};

export default ReferencePage;
