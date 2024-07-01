import axiosAuth from '@/lib/axios';
import { ResearchResponse } from '@/pages/ResearchPage/ResearchPage.types';
import { useQuery } from '@tanstack/react-query';
import styles from './HomeResearch.module.scss';
import { ResearchCard } from '@/pages/ResearchPage/components/ResearchCard';

const HomeResearch = () => {
    const getResearch = async () => {
        const res = await axiosAuth.get<ResearchResponse>('/latest-research?take=5');
        return res.data;
    };

    const { data } = useQuery({
        queryKey: ['get-home-research'],
        queryFn: getResearch,
    });

    return (
        <div className={styles.container}>
            {data?.data.map((item) => (
                <ResearchCard key={item.id} {...item} />
            ))}
        </div>
    );
};

export default HomeResearch;
