import IMAGES from '@/assets/images';
import {
    TablerArrowBarToDown,
    TablerArrowBarUp,
    TablerChevronRight,
    TablerHistory,
    TablerRocket,
} from '@/components/icon';
import { CustomList } from '@/components/ui/CustomList';
import { Flex } from '@/components/ui/Flex';
import { Title } from '@/components/ui/Title';
import axiosAuth from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { Avatar, Ellipsis, List, Space } from 'antd-mobile';
import { Link } from 'react-router-dom';
import styles from './WalletPage.module.scss';

type WalletUnit = 'gxp' | 'gp' | 'gemx' | 'usdt';
export type WalletBalanceResponse = Record<WalletUnit, number>;

const actions = [
    {
        icon: <TablerArrowBarUp className={styles.svg} />,
        text: 'Withdraw',
        link: '/wallet/withdraw',
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
    {
        icon: <TablerRocket className={styles.svg} />,
        text: 'Booster Plus',
        link: '/wallet/booster-plus',
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
            image: '/gemx-crypto.png',
            name: 'GXP',
            description: 'GEMX POINT',
            amount: dataBalances?.gxp,
            link: '/wallet/history?unit=gxp',
        },
        {
            image: '/gemx-crypto.png',
            name: 'GXN',
            description: 'GXN',
            amount: dataBalances?.gemx,
            link: '/wallet/history?unit=gemx',
        },
        {
            image: IMAGES.usdt,
            name: 'USDC',
            description: 'USDC',
            amount: dataBalances?.usdt,
            link: '/wallet/history?unit=usdt',
        },
    ];

    return (
        <div className={styles.container}>
            {/* Title */}
            <Title text='Wallet' />

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
                <Title text='Balance' type='subtitle' />

                {/* List */}
                <CustomList>
                    {balances.map((item, index) => (
                        <Link key={index} to={item.link}>
                            <List.Item
                                className={styles.item}
                                prefix={<Avatar src={item.image} className={styles.image} />}
                                description={item.description}
                                extra={
                                    <Space align='center'>
                                        <div className={styles.amount}>{item.amount}</div>
                                        <Flex align='center'>
                                            <TablerChevronRight />
                                        </Flex>
                                    </Space>
                                }
                            >
                                <Ellipsis content={item.name} />
                            </List.Item>
                        </Link>
                    ))}
                </CustomList>
            </div>
        </div>
    );
};

export default WalletPage;
