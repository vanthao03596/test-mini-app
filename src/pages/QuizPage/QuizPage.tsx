import { Title } from '@/components/ui/Title';
import axiosAuth from '@/lib/axios';
import { Button, InfiniteScroll, SearchBar } from 'antd-mobile';
import { useState } from 'react';
import { InfiniteScrollContent } from './components/InfiniteScrollContent';
import { QuizCard } from './components/QuizCard';
import styles from './QuizPage.module.scss';
import { QuizListResponse } from './QuizPage.types';
import { Flex } from '@/components/ui/Flex';
import { TablerSearch } from '@/components/icon';

const BASE_URL = '/quizz';

const QuizPage = () => {
    const [data, setData] = useState<QuizListResponse['data']>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [nextUrl, setNextUrl] = useState<QuizListResponse['next_page_url']>(BASE_URL);
    const [search, setSearch] = useState<string>('');

    const getQuiz = async () => {
        // Create url
        let url = BASE_URL;
        if (nextUrl) {
            url = nextUrl;
        } else if (search) {
            url = `${BASE_URL}?search=${search}`;
        }

        // Fetch
        const res = await axiosAuth.get<QuizListResponse>(url);
        return res.data;
    };

    const loadMore = async () => {
        const append = await getQuiz();

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

    return (
        <div className={styles.container}>
            {/* Title */}
            <Title text='Quiz' />

            {/* Search */}
            <div className={styles.search}>
                <div className={styles.left}>
                    <SearchBar
                        icon={
                            <Flex align='center'>
                                <TablerSearch className={styles.icon} />
                            </Flex>
                        }
                        onChange={handleSearchChange}
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
                    <QuizCard key={item.id} {...item} />
                ))}
            </div>

            <InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
                <InfiniteScrollContent hasMore={hasMore} />
            </InfiniteScroll>
        </div>
    );
};

export default QuizPage;
