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
