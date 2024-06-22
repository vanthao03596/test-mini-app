import { TablerExternalLink } from '@/components/icon';
import { CustomCard } from '@/components/ui/CustomCard';
import { Flex } from '@/components/ui/Flex';
import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';
import stripTag from '@/utils/stripTag';
import { Avatar, Space } from 'antd-mobile';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { Research } from '../../ResearchPage.types';
import styles from './ResearchCard.module.scss';

type ResearchCardProps = Research;

const ResearchCard = (props: ResearchCardProps) => {
    const { img_path, user, title, content_short, created_at, slug } = props;

    return (
        <CustomCard className={styles.card}>
            {/* Image */}
            <div className={styles.banner}>
                <img src={img_path} alt='' />
            </div>

            <div className={styles.main}>
                {/* Author */}
                <Space className={styles.author} align='center'>
                    <Avatar src={user.image_path || ''} className={styles.avatar} />
                    <div className={styles.name}>{user.name}</div>
                </Space>

                {/* Title */}
                <div className={styles.title}>{title}</div>

                {/* Description */}
                <div className={styles.description}>{stripTag(content_short)}</div>

                {/* Footer */}
                <Flex justify='space-between' align='center' className={styles.footer}>
                    <div className={styles.date}>{capitalizeFirstLetter(dayjs.utc(created_at).fromNow())}</div>
                    <Link to={`https://gemx.io/research/${slug}`} target='blank' className={styles.more}>
                        <Space align='center'>
                            <div>Read more</div>
                            <Flex align='center'>
                                <TablerExternalLink />
                            </Flex>
                        </Space>
                    </Link>
                </Flex>
            </div>
        </CustomCard>
    );
};

export default ResearchCard;
