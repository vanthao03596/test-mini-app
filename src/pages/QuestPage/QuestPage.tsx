import { TablerCalendarMonth, TablerExternalLink, TablerEye, TablerGift } from '@/components/icon';
import { CustomCard } from '@/components/ui/CustomCard';
import { CustomPagination } from '@/components/ui/CustomPagination';
import { Flex } from '@/components/ui/Flex';
import { Title } from '@/components/ui/Title';
import { DATE_FORMAT_TYPE } from '@/constants/public';
import usePageSize from '@/hooks/usePageSize';
import axiosAuth from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { Space } from 'antd-mobile';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import styles from './QuestPage.module.scss';
import { QuestsResponse } from './QuestPage.types';

const QuestPage = () => {
    const { page, handleChangePageSize } = usePageSize();

    const getQuests = async () => {
        const url = `/latest-campaign?page=${page}`;
        const res = await axiosAuth.get<QuestsResponse>(url);
        return res.data;
    };

    const { data: dataQuests } = useQuery({
        queryKey: ['get-quests', page],
        queryFn: getQuests,
    });

    return (
        <div className={styles.container}>
            {/* Title */}
            <Title text='Quest' variant='white' className={styles.pageTitle} />

            {/* List */}
            <div className={styles.list}>
                {dataQuests?.data.map((item) => (
                    <CustomCard border='normal' key={item.id} className={styles.item}>
                        {/* Banner */}
                        <div className={styles.banner}>
                            <img src={item.image} alt='' />
                        </div>

                        <div className={styles.main}>
                            {/* Title */}
                            <div className={styles.title}>{item.name}</div>

                            {/* Time */}
                            <Flex align='center'>
                                <TablerCalendarMonth className={styles.marginRight} />
                                <div>
                                    {dayjs.utc(item.start_date).format(DATE_FORMAT_TYPE)}
                                    <span> - </span>
                                    {dayjs.utc(item.end_date).format(DATE_FORMAT_TYPE)}
                                </div>
                            </Flex>

                            {/* Views */}
                            <Flex align='center'>
                                <TablerEye className={styles.marginRight} />
                                <div>{item.views}</div>
                            </Flex>

                            {/* Rewards */}
                            <Flex align='center'>
                                <TablerGift className={styles.marginRight} />
                                <Space>
                                    {item.rewards
                                        .map((i) => ({
                                            amount: i.params.total_token_amount / i.params.number_of_rewards,
                                            unit: i.params.token_type,
                                        }))
                                        .map((reward, index) => (
                                            <Space key={index} className={styles.reward}>
                                                <div>{reward.amount}</div>
                                                <div>{reward.unit}</div>
                                            </Space>
                                        ))}
                                </Space>
                            </Flex>

                            {/* Footer */}
                            <Flex justify='space-between' align='center' className={styles.footer}>
                                <div className={styles.state}>
                                    {dayjs.utc().isBefore(dayjs.utc(item.end_date)) ? 'Ongoing' : 'Finished'}
                                </div>
                                <Link
                                    to={`https://gemx.io/campaign/${item.slug}`}
                                    target='blank'
                                    className={styles.more}
                                >
                                    <Space align='center'>
                                        <div>Read more</div>
                                        <Flex align='center'>
                                            <TablerExternalLink />
                                        </Flex>
                                    </Space>
                                </Link>
                            </Flex>
                        </div>
                    </CustomCard>
                ))}
            </div>

            {/* Pagination */}
            {dataQuests && (
                <Flex justify='center' className={styles.pagination}>
                    <CustomPagination
                        pageNumber={dataQuests.current_page}
                        totalPages={dataQuests.last_page}
                        handlePageChange={handleChangePageSize}
                    />
                </Flex>
            )}
        </div>
    );
};

export default QuestPage;
