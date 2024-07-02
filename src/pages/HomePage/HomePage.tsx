import { Button, Image, Space } from 'antd-mobile';
import { HomeBanner } from './components/HomeBanner';
import { HomeResearch } from './components/HomeResearch';
import styles from './HomePage.module.scss';
import { Link } from 'react-router-dom';
import { Title } from '@/components/ui/Title';
import { Flex } from '@/components/ui/Flex';
import IMAGES from '@/assets/images';

const HomePage = () => {
    return (
        <div className={styles.container}>
            {/* Logo */}
            <Flex justify='center' className={styles.logo}>
                <Image src={IMAGES.logoWithText} width={'50%'} />
            </Flex>

            {/* Banner */}
            <HomeBanner />

            {/* Research */}
            <Title text='Latest Research' type='subtitle' />
            <HomeResearch />

            {/* Mint */}
            <div>
                <Link to='/earn/mint'>
                    <Button color='primary' fill='solid' block>
                        <Flex justify='center' align='center'>
                            <Space>
                                <Image src='/gemx-crypto.png' width={26} />
                                <div>Mint GXP</div>
                            </Space>
                        </Flex>
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default HomePage;
