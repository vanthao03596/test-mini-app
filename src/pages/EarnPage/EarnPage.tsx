import { TablerChevronRight } from '@/components/icon';
import { CustomList } from '@/components/ui/CustomList';
import { Title } from '@/components/ui/Title';
import { Avatar, Ellipsis, List } from 'antd-mobile';
import { Link } from 'react-router-dom';
import styles from './EarnPage.module.scss';

const links = [
    {
        text: 'Social Task',
        link: '/earn/social-task',
        description: 'Do the task and get more GXP',
    },
    {
        text: 'Quest',
        link: '/earn/quest',
        description: 'Do the quest and get more GXP',
    },
    // {
    //     text: 'Quiz',
    //     link: '/earn/quiz',
    //     description: 'Do the quiz and get more GXP',
    // },
    {
        text: 'Leaderboard',
        link: '/earn/leaderboard',
        description: 'View leaderboard this month',
    },
];

const EarnPage = () => {
    return (
        <div className={styles.container}>
            <Title text='Earn' />

            <CustomList>
                {links.map((item, index) => (
                    <Link to={item.link} key={index}>
                        <List.Item
                            prefix={<Avatar src={'/gemx-crypto.png'} />}
                            description={item.description}
                            extra={<TablerChevronRight />}
                        >
                            <Ellipsis content={item.text} />
                        </List.Item>
                    </Link>
                ))}
            </CustomList>
        </div>
    );
};

export default EarnPage;
