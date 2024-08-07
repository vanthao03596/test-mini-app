import { CustomList } from '@/components/ui/CustomList';
import useUser from '@/hooks/useUser';
import { truncateEthAddress } from '@/utils/truncateEthAddress';
import { Avatar, Ellipsis, List } from 'antd-mobile';
import styles from './NetworkUser.module.scss';

const NetworkUser = () => {
    const account = useUser();

    return (
        <div className={styles.container}>
            <CustomList className={styles.list}>
                <List.Item
                    prefix={<Avatar src={account?.user.image_path || ''} />}
                    description={`Level ${account?.user.gas_rate_lvl}`}
                    className={styles.listItem}
                >
                    <Ellipsis content={truncateEthAddress(account?.user.address)} />
                </List.Item>
            </CustomList>
        </div>
    );
};

export default NetworkUser;
