import { TablerArrowBarToDown, TablerArrowBarUp, TablerHistory } from '@/components/icon';
import { Flex } from '@/components/ui/Flex';
import { Avatar, List, Space } from 'antd-mobile';
import { Link } from 'react-router-dom';
import styles from './WalletPage.module.scss';
import IMAGES from '@/assets/images';
import clsx from 'clsx';

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
    const balances = [
        {
            image: IMAGES.usdt,
            name: 'GXP',
            description: 'GEMX POINT',
            amount: 10,
            link: '/wallet/history?unit=gxp',
        },
        {
            image: IMAGES.usdt,
            name: 'GPAY',
            description: 'GEMX PAY',
            amount: 12,
            link: '/wallet/history?unit=gp',
        },
        {
            image: IMAGES.usdt,
            name: 'GEMX',
            description: 'GEMX TOKEN',
            amount: 10,
            link: '/wallet/history?unit=gemx',
        },
        {
            image: IMAGES.usdt,
            name: 'USDT',
            description: 'USDT',
            amount: 28,
            link: '/wallet/history?unit=usdt',
        },
    ];

    return (
        <div className={styles.container}>
            {/* Actions */}
            <div className={styles.actions}>
                {actions.map((item, index) => (
                    <Link to={item.link}>
                        <Space direction='vertical' justify='center' align='center' key={index}>
                            <Flex align='center' justify='center' className={styles.icon}>
                                {item.icon}
                            </Flex>
                            <div className={styles.text}>{item.text}</div>
                        </Space>
                    </Link>
                ))}
            </div>

            {/* Balances */}
            <div className={styles.balances}>
                {/* Title */}
                <Flex justify='center' className={clsx('textGradient', styles.title)}>
                    Balance
                </Flex>
                {/* List */}
                <List className={styles.list}>
                    {balances.map((item, index) => (
                        <List.Item key={index} clickable className={styles.item}>
                            <Flex justify='space-between'>
                                <Flex align='center' gap={8}>
                                    <Avatar src={item.image} />
                                    <Flex direction='column'>
                                        <div className={styles.name}>{item.name}</div>
                                        <div className={styles.description}>{item.description}</div>
                                    </Flex>
                                </Flex>

                                <Flex align='center' gap={8}>
                                    <div className={styles.amount}>{item.amount}</div>
                                </Flex>
                            </Flex>
                        </List.Item>
                    ))}
                </List>
            </div>
        </div>
    );
};

export default WalletPage;
