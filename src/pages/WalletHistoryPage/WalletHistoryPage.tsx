import CustomPagination from '@/components/ui/CustomPagination/CustomPagination';
import { Flex } from '@/components/ui/Flex';
import { Title } from '@/components/ui/Title';
import usePageSize from '@/hooks/usePageSize';
import axiosAuth from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { List } from 'antd-mobile';
import dayjs from 'dayjs';
import { useSearchParams } from 'react-router-dom';
import { WalletBalanceResponse } from '../WalletPage/WalletPage';
import styles from './WalletHistoryPage.module.scss';
import { TablerCheck } from '@/components/icon';

type TransactionsData = {
    id: number;
    wallet_id: number;
    transactionable_type: string;
    transactionable_id: number;
    amount: string;
    extra_type: string;
    created_at: Date;
    updated_at: Date;
    wallet: {
        id: number;
        type: string;
    };
};

type TransactionsResponse = {
    current_page: number;
    data: TransactionsData[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
        url?: string;
        label: string;
        active: boolean;
    }[];
    next_page_url?: string;
    path: string;
    per_page: number;
    prev_page_url?: string;
    to: number;
    total: number;
};

const WalletHistoryPage = () => {
    const [searchParams] = useSearchParams();
    const unit = searchParams.get('unit')?.trim() || '';
    const { page, handleChangePageSize } = usePageSize();

    const getBalance = async () => {
        const res = await axiosAuth.get<WalletBalanceResponse>('/wallet/balance');
        return res.data;
    };

    const { data: dataBalances } = useQuery({
        queryKey: ['get-balance'],
        queryFn: getBalance,
    });

    const getTransactions = async () => {
        const url = `wallet/transaction?wallet=${unit}&page=${page}`;
        const res = await axiosAuth.get<TransactionsResponse>(url);
        return res.data;
    };

    const { data: dataTransactions } = useQuery({
        queryKey: ['get-transactions', unit, page],
        queryFn: getTransactions,
    });

    console.log('dataTransactions', dataTransactions);

    return (
        <div className={styles.container}>
            {/* Title */}
            <Title text={unit ? unit + ' balance' : 'history'} className={styles.title} />

            {/* Balance */}
            {unit && (
                <Flex justify='center' align='center' direction='column' className={styles.balance}>
                    {dataBalances && (
                        <Title
                            fontSize={36}
                            text={dataBalances[unit as keyof WalletBalanceResponse] + ''}
                            className={styles.amountText}
                        />
                    )}
                    <Title text='History' fontSize={24} gradient={false} className={styles.historyText}></Title>
                </Flex>
            )}

            {/* List  */}
            {dataTransactions?.data && (
                <List className={styles.list}>
                    {dataTransactions?.data.map((item, index) => (
                        <List.Item key={index} className={styles.item}>
                            <Flex justify='space-between' gap={64}>
                                {/* Left */}
                                <Flex align='center' className={styles.left}>
                                    <TablerCheck className={styles.icon} />
                                    <Flex direction='column'>
                                        <div className={styles.type}>{item.transactionable_type}</div>
                                        <div className={styles.date}>
                                            {dayjs(item.created_at).format('HH:mm MM/DD/YYYY ')}
                                        </div>
                                    </Flex>
                                </Flex>
                                {/* Right */}
                                <Flex direction='column' align='flex-end'>
                                    <div className={styles.amount}>+{item.amount}</div>
                                    <div className={styles.unit}>{item.wallet.type}</div>
                                </Flex>
                            </Flex>
                        </List.Item>
                    ))}
                </List>
            )}

            {/* Pagination */}
            {dataTransactions && dataTransactions?.data.length > 0 && (
                <Flex justify='center' className={styles.pagination}>
                    <CustomPagination
                        pageNumber={dataTransactions.current_page}
                        totalPages={dataTransactions.last_page}
                        handlePageChange={handleChangePageSize}
                    />
                </Flex>
            )}
        </div>
    );
};

export default WalletHistoryPage;
