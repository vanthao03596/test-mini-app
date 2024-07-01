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
            <Title text='Latest Research' fontSize={24} />
            <HomeResearch />

            {/* Mint */}
            <div>
                <Link to='/earn/mint'>
                    <Button color='primary' fill='solid' block>
                        <Space align='center'>
                            <Image src='/gemx-crypto.png' width={26} height={20} />
                            <div>Mint GXP</div>
                        </Space>
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default HomePage;
