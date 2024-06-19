import { TablerArrowBarToDown, TablerArrowBarUp, TablerHistory } from '@/components/icon';
import { Flex } from '@/components/ui/Flex';
import { Space } from 'antd-mobile';
import { Link } from 'react-router-dom';
import styles from './WalletPage.module.scss';

const actions = [
    {
        icon: <TablerArrowBarUp fontSize={20} />,
        text: 'Send',
        link: '/wallet/send',
    },
    {
        icon: <TablerArrowBarToDown fontSize={20} />,
        text: 'Receive',
        link: '/wallet/receive',
    },
    {
        icon: <TablerHistory fontSize={20} />,
        text: 'History',
        link: '/wallet/history',
    },
];

const WalletPage = () => {
    return (
        <div className={styles.container}>
            {/* Actions */}
            <div className={styles.actions}>
                {actions.map((item, index) => (
                    <Link to={item.link}>
                        <Space direction='vertical' justify='center' align='center' key={index}>
                            <div className={styles.icon}>
                                <Flex align='center' justify='center'>
                                    {item.icon}
                                </Flex>
                            </div>
                            <div>{item.text}</div>
                        </Space>
                    </Link>
                ))}
            </div>
            {/* Balances */}
        </div>
    );
};

export default WalletPage;
