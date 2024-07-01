import { Button, Space } from 'antd-mobile';
import { HomeBanner } from './components/HomeBanner';
import { HomeResearch } from './components/HomeResearch';
import styles from './HomePage.module.scss';
import { Link } from 'react-router-dom';
import { Title } from '@/components/ui/Title';
import { HugeiconsMining02 } from '@/components/icon';
import { Flex } from '@/components/ui/Flex';

const HomePage = () => {
    return (
        <div className={styles.container}>
            <Title text='Ecosystem' variant='white' />
            <HomeBanner />
            <Title text='Latest Research' fontSize={24} />
            <HomeResearch />
            <div>
                <Link to='/earn/mint'>
                    <Button color='primary' fill='solid' block>
                        <Space align='center'>
                            <Flex align='center'>
                                <HugeiconsMining02 />
                            </Flex>
                            <div>Mint GXP</div>
                        </Space>
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default HomePage;
