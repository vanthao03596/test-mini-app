import { TablerCheck } from '@/components/icon';

import { CustomList } from '@/components/ui/CustomList';
import { CustomPagination } from '@/components/ui/CustomPagination';
import { Flex } from '@/components/ui/Flex';
import { Title } from '@/components/ui/Title';
import { DATE_FORMAT_TYPE } from '@/constants/public';
import usePageSize from '@/hooks/usePageSize';
import axiosAuth from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { Ellipsis, List } from 'antd-mobile';
import dayjs from 'dayjs';
import { useSearchParams } from 'react-router-dom';
import { WalletBalanceResponse } from '../WalletPage/WalletPage';
import styles from './WalletHistoryPage.module.scss';
import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';
import clsx from 'clsx';

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

    return (
        <div className={styles.container}>
            {/* Title */}
            <Title text={unit ? (unit == 'usdt' ? 'usdc' : unit) + ' balance' : 'history'} />

            {/* Balance */}
            {unit && (
                <Flex justify='center' align='center' direction='column'>
                    {dataBalances && (
                        <Title type='gold' text={dataBalances[unit as keyof WalletBalanceResponse] + ''} />
                    )}
                    <Title text='History' type='subtitle'></Title>
                </Flex>
            )}

            {/* List  */}
            {dataTransactions?.data && dataTransactions.data.length > 0 && (
                <CustomList className={styles.list}>
                    {dataTransactions.data.map((item, index) => (
                        <List.Item
                            key={index}
                            className={styles.item}
                            prefix={<TablerCheck className={styles.icon} />}
                            description={dayjs(item.created_at).format(DATE_FORMAT_TYPE)}
                            extra={
                                <Flex direction='column' align='flex-end'>
                                    <div
                                        className={clsx(
                                            styles.amount,
                                            Number(item.amount) > 0 ? styles.add : styles.sub
                                        )}
                                    >
                                        {Number(item.amount) > 0 && '+'}
                                        {item.amount}
                                    </div>
                                    <div className={styles.unit}>{item.wallet.type == 'usdt' ? 'USDC' : item.wallet.type == 'usdt'}</div>
                                </Flex>
                            }
                        >
                            <Ellipsis
                                content={capitalizeFirstLetter(item.transactionable_type.split('_').join(' '))}
                            ></Ellipsis>
                        </List.Item>
                    ))}
                </CustomList>
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
