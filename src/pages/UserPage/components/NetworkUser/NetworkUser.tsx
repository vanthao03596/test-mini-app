import { CustomList } from '@/components/ui/CustomList';
import useUser from '@/hooks/useUser';
import { truncateEthAddress } from '@/utils/truncateEthAddress';
import { Avatar, Ellipsis, List } from 'antd-mobile';
import styles from './NetworkUser.module.scss';

const NetworkUser = () => {
    const user = useUser();

    return (
        <div className={styles.container}>
            <CustomList className={styles.list}>
                <List.Item
                    prefix={<Avatar src={user?.image_path || ''} />}
                    description={user?.email}
                    className={styles.listItem}
                >
                    <Ellipsis content={truncateEthAddress(user?.address)} className={styles.address} />
                    <div className={styles.level}>Level {user?.gas_rate_lvl}</div>
                </List.Item>
            </CustomList>
        </div>
    );
};

export default NetworkUser;
