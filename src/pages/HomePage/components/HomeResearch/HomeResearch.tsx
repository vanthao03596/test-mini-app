import { TablerChevronRight } from '@/components/icon';
import { CustomList } from '@/components/ui/CustomList';
import axiosAuth from '@/lib/axios';
import { ResearchResponse } from '@/pages/ResearchPage/ResearchPage.types';
import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';
import { useQuery } from '@tanstack/react-query';
import { Avatar, Ellipsis, List } from 'antd-mobile';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import styles from './HomeResearch.module.scss';

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
            <CustomList>
                {data?.data.map((item) => (
                    <Link to={`/research/${item.id}`} key={item.id}>
                        <List.Item
                            prefix={<Avatar src={item.img_path} />}
                            extra={<TablerChevronRight />}
                            description={capitalizeFirstLetter(dayjs.utc(item.created_at).fromNow())}
                        >
                            <Ellipsis content={item.title} />
                        </List.Item>
                    </Link>
                ))}
            </CustomList>
        </div>
    );
};

export default HomeResearch;
