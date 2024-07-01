import { Button } from 'antd-mobile';
import styles from './EarnPage.module.scss';
import { Link } from 'react-router-dom';

const links = [
    {
        text: 'Mint GXP',
        link: '/earn/mint',
    },
    {
        text: 'Quest',
        link: '/earn/quest',
    },
    {
        text: 'Leader Board',
        link: '/earn/leader',
    },
];

const EarnPage = () => {
    return (
        <div className={styles.container}>
            {links.map((item, index) => (
                <div key={index}>
                    <Link to={item.link}>
                        <Button color='primary' fill='solid' block>
                            {item.text}
                        </Button>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default EarnPage;
