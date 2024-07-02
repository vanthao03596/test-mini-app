import { TablerChevronRight } from '@/components/icon';
import { CustomList } from '@/components/ui/CustomList';
import { Title } from '@/components/ui/Title';
import { Avatar, Ellipsis, List } from 'antd-mobile';
import { Link } from 'react-router-dom';
import styles from './CryptoPage.module.scss';

const links = [
    {
        text: 'Trending',
        link: '/trending',
        description: 'View trending coin',
    },
    {
        text: 'Research',
        link: '/research',
        description: 'Read research',
    },
];

const CryptoPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.container}>
                <Title text='Crypto' variant='white' hasBack className={styles.pageTitle} />

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
        </div>
    );
};

export default CryptoPage;
