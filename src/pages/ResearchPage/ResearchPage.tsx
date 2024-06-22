import { Title } from '@/components/ui/Title';
import axiosAuth from '@/lib/axios';
import { InfiniteScroll } from 'antd-mobile';
import { useState } from 'react';
import styles from './ResearchPage.module.scss';
import { ResearchResponse } from './ResearchPage.types';
import { InfiniteScrollContent } from './components/InfiniteScrollContent';
import { ResearchCard } from './components/ResearchCard';

const ResearchPage = () => {
    const [data, setData] = useState<ResearchResponse['data']>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [nextUrl, setNextUrl] = useState<ResearchResponse['next_page_url']>('/latest-research');

    const getLastResearch = async () => {
        if (nextUrl) {
            const res = await axiosAuth.get<ResearchResponse>(nextUrl);
            return res.data;
        }
    };

    const loadMore = async () => {
        const append = await getLastResearch();

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
            <Title text='Research' variant='white' className={styles.pageTitle} />

            {/* List */}
            <div className={styles.list}>
                {data.map((item) => (
                    <ResearchCard key={item.id} {...item} />
                ))}
            </div>

            <InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
                <InfiniteScrollContent hasMore={hasMore} />
            </InfiniteScroll>
        </div>
    );
};

export default ResearchPage;
