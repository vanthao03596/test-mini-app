import { TablerChevronRight } from '@/components/icon';
import { CustomList } from '@/components/ui/CustomList';
import { Flex } from '@/components/ui/Flex';
import axiosAuth from '@/lib/axios';
import { ResearchResponse } from '@/pages/ResearchPage/ResearchPage.types';
import { useQuery } from '@tanstack/react-query';
import { Image, List } from 'antd-mobile';
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
                                style={{ borderRadius: 20 }}
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
                                    <div className={styles.title}>{item.title}</div>
                                    <div className={styles.description}>{item.user.name}</div>
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
