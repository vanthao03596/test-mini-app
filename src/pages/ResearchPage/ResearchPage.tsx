import { TablerExternalLink } from '@/components/icon';
import { CustomCard } from '@/components/ui/CustomCard';
import { Flex } from '@/components/ui/Flex';
import { Title } from '@/components/ui/Title';
import axiosAuth from '@/lib/axios';
import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';
import stripTag from '@/utils/stripTag';
import { Avatar, InfiniteScroll, Space } from 'antd-mobile';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ResearchPage.module.scss';
import { ResearchResponse } from './ResearchPage.types';
import { InfiniteScrollContent } from './components/InfiniteScrollContent';

const ResearchPage = () => {
    const [data, setData] = useState<ResearchResponse['data']>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);

    const getLastResearch = async () => {
        const res = await axiosAuth.get<ResearchResponse>(`/latest-research?page=${page}`);
        return res.data;
    };

    const loadMore = async () => {
        const append = await getLastResearch();
        if (append.data.length > 0) {
            setData((prev) => [...prev, ...append.data]);
            setHasMore(true);
            setPage(page + 1);
        }
    };

    return (
        <div className={styles.container}>
            {/* Title */}
            <Title text='Research' variant='white' className={styles.pageTitle} />

            {/* List */}
            <div className={styles.list}>
                {data.map((item) => (
                    <CustomCard key={item.id} className={styles.item}>
                        {/* Image */}
                        <div className={styles.banner}>
                            <img src={item.img_path} alt='' />
                        </div>

                        <div className={styles.main}>
                            {/* Author */}
                            <Space className={styles.author} align='center'>
                                <Avatar src={item.user.image_path || ''} className={styles.avatar} />
                                <div className={styles.name}>{item.user.name}</div>
                            </Space>

                            {/* Title */}
                            <div className={styles.title}>{item.title}</div>

                            {/* Description */}
                            <div className={styles.description}>{stripTag(item.content_short)}</div>

                            {/* Footer */}
                            <Flex justify='space-between' align='center' className={styles.footer}>
                                <div className={styles.date}>
                                    {capitalizeFirstLetter(dayjs.utc(item.created_at).fromNow())}
                                </div>
                                <Link
                                    to={`https://gemx.io/research/${item.slug}`}
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

            <InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
                <InfiniteScrollContent hasMore={hasMore} />
            </InfiniteScroll>
        </div>
    );
};

export default ResearchPage;
