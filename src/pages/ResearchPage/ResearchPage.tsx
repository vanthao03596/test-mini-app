import { Title } from '@/components/ui/Title';
import axiosAuth from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { Button, CapsuleTabs, InfiniteScroll, SearchBar } from 'antd-mobile';
import { useState } from 'react';
import styles from './ResearchPage.module.scss';
import { ResearchResponse, TopicsResponse } from './ResearchPage.types';
import { InfiniteScrollContent } from './components/InfiniteScrollContent';
import { ResearchCard } from './components/ResearchCard';
import { TablerSearch } from '@/components/icon';
import { Flex } from '@/components/ui/Flex';

const BASE_URL = '/latest-research';

const ResearchPage = () => {
    const [data, setData] = useState<ResearchResponse['data']>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [nextUrl, setNextUrl] = useState<ResearchResponse['next_page_url']>(BASE_URL);
    const [search, setSearch] = useState<string>('');
    const [topic, setTopic] = useState<string>('');

    const getTopics = async () => {
        const res = await axiosAuth.get<TopicsResponse>('/topics');
        return res.data;
    };

    const { data: topicsData } = useQuery({
        queryKey: ['get-topics'],
        queryFn: getTopics,
    });

    const getLastResearch = async () => {
        // Create url with search
        let url = BASE_URL;

        if (nextUrl) {
            url = nextUrl;
        } else {
            if (search && topic) {
                url = `${BASE_URL}?search=${search}&topics=${topic}`;
            } else if (search) {
                url = `${BASE_URL}?search=${search}`;
            } else if (topic) {
                url = `${BASE_URL}?topics=${topic}`;
            }
        }

        // Fetch data
        const res = await axiosAuth.get<ResearchResponse>(url);
        return res.data;
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

    const doSearch = () => {
        setData([]);
        setHasMore(true);
        setNextUrl('');
    };

    const handleSearchChange = (value: string) => {
        setSearch(value);
    };

    const handleTabChange = (key: string) => {
        setTopic(key !== 'all' ? key : '');
        doSearch();
    };

    return (
        <div className={styles.container}>
            {/* Title */}
            <Title text='Research' />

            {/* Topics */}
            <CapsuleTabs defaultActiveKey={'all'} className={styles.tabs} onChange={handleTabChange}>
                {/* All */}
                <CapsuleTabs.Tab key={'all'} title={'All'} className={styles.item} />

                {/* List */}
                {topicsData?.topics.map((item) => (
                    <CapsuleTabs.Tab key={String(item.id)} title={item.name} className={styles.item} />
                ))}
            </CapsuleTabs>

            {/* Search */}
            <div className={styles.search}>
                <div className={styles.left}>
                    <SearchBar
                        onChange={handleSearchChange}
                        icon={
                            <Flex align='center'>
                                <TablerSearch className={styles.icon} />
                            </Flex>
                        }
                    />
                </div>
                <div className={styles.right}>
                    <Button size='small' color='primary' onClick={doSearch}>
                        Search
                    </Button>
                </div>
            </div>

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
