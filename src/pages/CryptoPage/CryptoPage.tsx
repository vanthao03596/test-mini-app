import { Button } from 'antd-mobile';
import { Link } from 'react-router-dom';
import styles from './CryptoPage.module.scss';

const links = [
    {
        text: 'Trending',
        link: '/trending',
    },
    {
        text: 'Research',
        link: '/research',
    },
];

const CryptoPage = () => {
    return (
        <div className={styles.container}>
            {links.map((item, index) => (
                <div key={index}>
                    <Link to={item.link}>
                        <Button block color='primary' fill='solid' className={styles.btn}>
                            {item.text}
                        </Button>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default CryptoPage;
