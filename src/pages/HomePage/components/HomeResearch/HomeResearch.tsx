import { TablerChevronRight } from '@/components/icon';
import { CustomList } from '@/components/ui/CustomList';
import { Flex } from '@/components/ui/Flex';
import axiosAuth from '@/lib/axios';
import { ResearchResponse } from '@/pages/ResearchPage/ResearchPage.types';
import { useQuery } from '@tanstack/react-query';
import { Ellipsis, Image, List } from 'antd-mobile';
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
            <CustomList className={styles.list}>
                {data?.data.map((item) => (
                    <List.Item
                        key={item.id}
                        prefix={
                            <Image
                                src={item.img_path}
                                style={{ borderRadius: '50%' }}
                                fit='cover'
                                width={40}
                                height={40}
                            />
                        }
                        className={styles.item}
                    >
                        <Link to={`/research/${item.id}`}>
                            <Flex justify='space-between'>
                                {/* Left */}
                                <Flex direction='column'>
                                    <Ellipsis content={item.title} />
                                    <Ellipsis content={item.user.name || ''} className={styles.description} />
                                </Flex>
                                {/* Right */}
                                <Flex align='center' className={styles.iconWrapper}>
                                    <TablerChevronRight className={styles.icon} />
                                </Flex>
                            </Flex>
                        </Link>
                    </List.Item>
                ))}
            </CustomList>
        </div>
    );
};

export default HomeResearch;
