import { Title } from '@/components/ui/Title';
import axiosAuth from '@/lib/axios';
import { InfiniteScroll } from 'antd-mobile';
import { useState } from 'react';
import { InfiniteScrollContent } from './components/InfiniteScrollContent';
import { QuestCard } from './components/QuestCard';
import styles from './QuestPage.module.scss';
import { QuestsResponse } from './QuestPage.types';

const QuestPage = () => {
    const [data, setData] = useState<QuestsResponse['data']>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [nextUrl, setNextUrl] = useState<QuestsResponse['next_page_url']>('/latest-campaign');

    const getQuests = async () => {
        if (nextUrl) {
            const res = await axiosAuth.get<QuestsResponse>(nextUrl);
            return res.data;
        }
    };

    const loadMore = async () => {
        const append = await getQuests();

        if (!append) return;

        if (append.data) {
            setData((prev) => [...prev, ...append.data]);

            if (append.next_page_url) {
                setHasMore(true);
                setNextUrl(append.next_page_url);
            } else {
                setHasMore(false);
                setNextUrl(null);
            }
        }
    };

    return (
        <div className={styles.container}>
            {/* Title */}
            <Title text='Quest' variant='white' className={styles.pageTitle} />

            {/* List */}
            <div className={styles.list}>
                {data.map((item) => (
                    <QuestCard key={item.id} {...item} />
                ))}
            </div>

            <InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
                <InfiniteScrollContent hasMore={hasMore} />
            </InfiniteScroll>
        </div>
    );
};

export default QuestPage;
