import { TablerChevronRight } from '@/components/icon';
import { CustomList } from '@/components/ui/CustomList';
import { Title } from '@/components/ui/Title';
import { Avatar, Ellipsis, List } from 'antd-mobile';
import { Link } from 'react-router-dom';
import styles from './EarnPage.module.scss';

const links = [
    {
        text: 'Mining',
        link: '/earn/mint',
        description: 'Earn GXP by mining',
    },
    {
        text: 'Quest',
        link: '/earn/quest',
        description: 'Do the quest and get more GXP',
    },
    {
        text: 'Leaderboard',
        link: '/earn/leader',
        description: 'View leaderboard',
    },
];

const EarnPage = () => {
    return (
        <div className={styles.container}>
            <Title text='Earn' variant='white' hasBack className={styles.pageTitle} />

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
