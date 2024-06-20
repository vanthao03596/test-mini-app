import { TablerExternalLink } from '@/components/icon';
import { Flex } from '@/components/ui/Flex';
import { Title } from '@/components/ui/Title';
import axiosAuth from '@/lib/axios';
import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';
import stripTag from '@/utils/stripTag';
import { useQuery } from '@tanstack/react-query';
import { Avatar, Card, Space } from 'antd-mobile';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import styles from './ResearchPage.module.scss';
import { ResearchResponse } from './ResearchPage.types';

const ResearchPage = () => {
    const getLastResearch = async () => {
        const res = await axiosAuth.get<ResearchResponse>('/latest-research');
        return res.data;
    };

    const { data: researchData } = useQuery({
        queryKey: ['last-research'],
        queryFn: getLastResearch,
    });

    return (
        <div className={styles.container}>
            {/* Title */}
            <Title text='Research' variant='white' className={styles.pageTitle} />

            <div className={styles.list}>
                {researchData?.data.map((item) => (
                    <Card key={item.id} className={styles.item}>
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
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ResearchPage;
