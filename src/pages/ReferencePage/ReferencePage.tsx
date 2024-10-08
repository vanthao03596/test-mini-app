import { Title } from '@/components/ui/Title';
import styles from './ReferencePage.module.scss';
import { Avatar, Ellipsis, List, Space, Tabs } from 'antd-mobile';
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
        <List.Item
            key={id}
            className={styles.item}
            prefix={<Avatar src={image_path || ''} />}
            extra={
                <Flex align='flex-end' justify='space-between' direction='column'>
                    <div>Level {gas_rate_lvl}</div>
                    {!!is_vip && (
                        <Space align='center' className={styles.vip}>
                            <div>VIP</div>
                            <Flex align='center'>
                                <TablerCrown className={styles.icon} />
                            </Flex>
                        </Space>
                    )}
                </Flex>
            }
            description={truncateEthAddress(address)}
        >
            <Ellipsis content={telegram_username || ''} />
        </List.Item>
    );
};

const ReferencePage = () => {
    const { listF1, listF2 } = useReference();

    return (
        <div className={styles.container}>
            {/* Title */}
            <Title text='List' />

            {/* List */}
            <Tabs defaultActiveKey='f1'>
                {/* Tab F1 */}
                <Tabs.Tab {...(listF1 ? {title: `F1 ${listF1.length}`} : {title: ''})} key='f1'>
                    {listF1 && listF1.length > 0 && (
                        <CustomList className={styles.list}>
                            {listF1?.map((item) => (
                                <ListItem {...item} />
                            ))}
                        </CustomList>
                    )}
                </Tabs.Tab>

                {/* Tab F2 */}
                <Tabs.Tab {...(listF2 ? {title: `F2 ${listF2.length}`} : {title: ''})} key='f2'>
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
