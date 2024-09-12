import { CustomList } from '@/components/ui/CustomList';
import useUser from '@/hooks/useUser';
import { truncateEthAddress } from '@/utils/truncateEthAddress';
import { Avatar, Ellipsis, List, Space } from 'antd-mobile';
import styles from './NetworkUser.module.scss';
import { Link } from 'react-router-dom';

type EmailState = 'VERIFIED' | 'PENDING' | 'REQUIRED';

type DescriptionData = {
    [key in EmailState]: React.ReactNode;
};

const NetworkUser = () => {
    const user = useUser();

    if (!user) return;

    // Check email state
    const state: EmailState = user.email_verified_at ? (user.email ? 'VERIFIED' : 'PENDING') : 'REQUIRED';

    // Create render data
    const data: DescriptionData = {
        VERIFIED: user.email,
        PENDING: (
            <Space>
                <div>{user.email}</div>
                <div className={styles.colorPrimary}>
                    <Link to={'/verify-email'}>(Verify your email)</Link>
                </div>
            </Space>
        ),
        REQUIRED: (
            <div className={styles.colorPrimary}>
                <Link to={'/verify-email'}>Verify your email</Link>
            </div>
        ),
    };

    return (
        <div className={styles.container}>
            <CustomList className={styles.list}>
                <List.Item
                    prefix={<Avatar src={user?.image_path || ''} />}
                    description={data[state]}
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
