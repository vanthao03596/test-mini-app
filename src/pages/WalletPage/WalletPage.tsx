import IMAGES from '@/assets/images';
import { TablerArrowBarToDown, TablerArrowBarUp, TablerChevronRight, TablerHistory } from '@/components/icon';
import { Flex } from '@/components/ui/Flex';
import { Title } from '@/components/ui/Title';
import axiosAuth from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { Avatar, List, Space } from 'antd-mobile';
import { Link } from 'react-router-dom';
import styles from './WalletPage.module.scss';

type WalletUnit = 'gxp' | 'gp' | 'gemx' | 'usdt';
export type WalletBalanceResponse = Record<WalletUnit, number>;

const actions = [
    {
        icon: <TablerArrowBarUp className={styles.svg} />,
        text: 'Send',
        link: '/wallet/send',
    },
    {
        icon: <TablerArrowBarToDown className={styles.svg} />,
        text: 'Receive',
        link: '/wallet/receive',
    },
    {
        icon: <TablerHistory className={styles.svg} />,
        text: 'History',
        link: '/wallet/history',
    },
];

const WalletPage = () => {
    const getBalance = async () => {
        const res = await axiosAuth.get<WalletBalanceResponse>('/wallet/balance');
        return res.data;
    };

    const { data: dataBalances } = useQuery({
        queryKey: ['get-balance'],
        queryFn: getBalance,
    });

    const balances = [
        {
            image: IMAGES.usdt,
            name: 'GXP',
            description: 'GEMX POINT',
            amount: dataBalances?.gxp,
            link: '/wallet/history?unit=gxp',
        },
        {
            image: IMAGES.usdt,
            name: 'GPAY',
            description: 'GEMX PAY',
            amount: dataBalances?.gp,
            link: '/wallet/history?unit=gp',
        },
        {
            image: IMAGES.usdt,
            name: 'GEMX',
            description: 'GEMX TOKEN',
            amount: dataBalances?.gemx,
            link: '/wallet/history?unit=gemx',
        },
        {
            image: IMAGES.usdt,
            name: 'USDT',
            description: 'USDT',
            amount: dataBalances?.usdt,
            link: '/wallet/history?unit=usdt',
        },
    ];

    return (
        <div className={styles.container}>
            {/* Title */}
            <Title text='Wallet' className={styles.pageTitle} />

            {/* Actions */}
            <div className={styles.actions}>
                {actions.map((item, index) => (
                    <Link to={item.link} key={index}>
                        <Space direction='vertical' justify='center' align='center'>
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
                <Title text='Balance' fontSize={24} gradient={false} className={styles.title} />
                {/* List */}
                <List className={styles.list}>
                    {balances.map((item, index) => (
                        <List.Item key={index} className={styles.item}>
                            <Link to={item.link}>
                                <Flex justify='space-between'>
                                    {/* Left */}
                                    <Flex align='center' gap={8}>
                                        <Avatar src={item.image} />
                                        <Flex direction='column'>
                                            <div className={styles.name}>{item.name}</div>
                                            <div className={styles.description}>{item.description}</div>
                                        </Flex>
                                    </Flex>
                                    {/* Right */}
                                    <Flex align='center' gap={4}>
                                        <div className={styles.amount}>{item.amount}</div>
                                        <TablerChevronRight className={styles.icon} />
                                    </Flex>
                                </Flex>
                            </Link>
                        </List.Item>
                    ))}
                </List>
            </div>
        </div>
    );
};

export default WalletPage;
