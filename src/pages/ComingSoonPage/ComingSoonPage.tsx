import styles from './ComingSoonPage.module.scss';
import { CustomCard } from '@/components/ui/CustomCard';
import { Title } from '@/components/ui/Title';

const ComingSoonPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.container}>
                <Title text='Coming soon' />

                <CustomCard className={styles.card}>Exciting updates ahead. Stay tuned for what's next!</CustomCard>
            </div>
        </div>
    );
};

export default ComingSoonPage;
