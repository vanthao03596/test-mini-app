import { TablerCalendarMonth, TablerCoin, TablerExternalLink, TablerUser } from '@/components/icon';
import { CustomCard } from '@/components/ui/CustomCard';
import { Flex } from '@/components/ui/Flex';
import { DATE_FORMAT_TYPE } from '@/constants/public';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { QuizList } from '../../QuizPage.types';
import styles from './QuizCard.module.scss';
import { Space } from 'antd-mobile';

type QuizCardProps = QuizList;

const QuizCard = (props: QuizCardProps) => {
    const {
        start_date,
        research: { img_path },
        title,
        max_user_join,
        price_join,
        type_reward,
        id,
    } = props;

    return (
        <CustomCard className={styles.card}>
            {/* Banner */}
            <div className={styles.banner}>
                <img src={img_path} alt='' />
            </div>

            <div className={styles.main}>
                {/* Title */}
                <Link to={`/earn/quiz/${id}`} className={styles.title}>
                    {title}
                </Link>

                {/* Time */}
                <Flex align='center'>
                    <TablerCalendarMonth className={styles.marginRight} />
                    <div>Start date: {dayjs.utc(start_date).format(DATE_FORMAT_TYPE)}</div>
                </Flex>

                {/* Max users */}
                <Flex align='center'>
                    <TablerUser className={styles.marginRight} />
                    <div>Max users: {max_user_join}</div>
                </Flex>

                {/* Rewards */}
                <Flex align='center'>
                    <TablerCoin className={styles.marginRight} />
                    <div>
                        Price join: {price_join} {type_reward}
                    </div>
                </Flex>

                {/* Footer */}
                <Flex justify='space-between' align='center' className={styles.footer}>
                    <div className={styles.state}>
                        {dayjs.utc().isBefore(dayjs.utc(start_date)) ? 'Upcoming' : 'Started'}
                    </div>
                    <Link to={`/earn/quiz/${id}`} className={styles.more}>
                        <Space align='center'>
                            <div>Join now</div>
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

export default QuizCard;
