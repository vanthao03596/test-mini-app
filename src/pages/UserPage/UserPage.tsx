import { IconamoonLightning2Fill } from '@/components/icon';
import { Flex } from '@/components/ui/Flex';
import { NetworkInfo } from './components/NetworkInfo';
import styles from './UserPage.module.scss';
import { NetworkShare } from './components/NetworkShare';
import { Title } from '@/components/ui/Title';
import { NetworkUser } from './components/NetworkUser';

const UserPage = () => {
    return (
        <div className={styles.container}>
            <Title text='User' />
            <NetworkUser />
            <NetworkInfo />
            <Flex justify='center' align='center' className={styles.speed}>
                <IconamoonLightning2Fill className={styles.icon} />
                <div>Maximize your data: More nodes, more faster mining!</div>
            </Flex>
            <NetworkShare />
        </div>
    );
};

export default UserPage;
