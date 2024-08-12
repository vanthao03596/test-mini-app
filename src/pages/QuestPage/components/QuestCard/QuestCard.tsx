import { TablerCalendarMonth, TablerExternalLink, TablerEye, TablerGift } from '@/components/icon';
import { CustomCard } from '@/components/ui/CustomCard';
import { Flex } from '@/components/ui/Flex';
import { DATE_FORMAT_TYPE } from '@/constants/public';
import { Space } from 'antd-mobile';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { Quest } from '../../QuestPage.types';
import styles from './QuestCard.module.scss';
import DOMPurify from 'dompurify';

type QuestCardProps = Quest;

const QuestCard = (props: QuestCardProps) => {
    const { image, name, start_date, end_date, views, rewards, slug, id, description } = props;

    return (
        <CustomCard className={styles.card}>
            {/* Banner */}
            <div className={styles.banner}>
                <img src={image} alt='' />
            </div>

            <div className={styles.main}>
                {/* Title */}
                <Link to={`/earn/quest/${id}`} className={styles.title}>
                    {name}
                </Link>

                {/* Description */}
                <div
                    className={styles.description}
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}
                ></div>

                {/* Time */}
                <Flex align='center'>
                    <TablerCalendarMonth className={styles.marginRight} />
                    <div>
                        {dayjs.utc(start_date).format(DATE_FORMAT_TYPE)}
                        <span> - </span>
                        {dayjs.utc(end_date).format(DATE_FORMAT_TYPE)}
                    </div>
                </Flex>

                {/* Views */}
                <Flex align='center'>
                    <TablerEye className={styles.marginRight} />
                    <div>{views}</div>
                </Flex>

                {/* Rewards */}
                <Flex align='center'>
                    <TablerGift className={styles.marginRight} />
                    <Space>
                        {rewards
                            .map((i) => ({
                                amount: i.params.total_token_amount / i.params.number_of_rewards,
                                unit: i.params.token_type,
                            }))
                            .map((reward, index) => (
                                <Space key={index} className={styles.reward}>
                                    <div>{reward.amount}</div>
                                    <div>{reward.unit}</div>
                                </Space>
                            ))}
                    </Space>
                </Flex>

                {/* Footer */}
                <Flex justify='space-between' align='center' className={styles.footer}>
                    <div className={styles.state}>
                        {dayjs.utc().isBefore(dayjs.utc(end_date)) ? 'Ongoing' : 'Finished'}
                    </div>
                    <Link to={`https://gemx.io/campaign/${slug}`} target='blank' className={styles.more}>
                        <Space align='center'>
                            <Link to={`/earn/quest/${id}`}>Read more</Link>
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

export default QuestCard;
