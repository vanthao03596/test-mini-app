import { CustomCard } from '@/components/ui/CustomCard';
import { Title } from '@/components/ui/Title';
import styles from './ReceivePage.module.scss';

const ReceivePage = () => {
    return (
        <div className={styles.container}>
            <Title text='Receive' />

            <CustomCard className={styles.card}>Coming soon</CustomCard>
        </div>
    );
};

export default ReceivePage;
