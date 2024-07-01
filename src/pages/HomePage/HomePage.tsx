import { Button } from 'antd-mobile';
import { HomeBanner } from './components/HomeBanner';
import { HomeResearch } from './components/HomeResearch';
import styles from './HomePage.module.scss';
import { Link } from 'react-router-dom';
import { Title } from '@/components/ui/Title';

const HomePage = () => {
    return (
        <div className={styles.container}>
            <Title text='Ecosystem' variant='white' />
            <HomeBanner />
            <Title text='Latest Research' fontSize={24} />
            <HomeResearch />
            <div>
                <Link to='/earn'>
                    <Button color='primary' fill='solid' block>
                        Mint GXP
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default HomePage;
