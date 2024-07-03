import { Title } from '@/components/ui/Title';
import styles from './BoosterPage.module.scss';
import { CustomCard } from '@/components/ui/CustomCard';

const BoosterPage = () => {
    const boosters = [
        {
            text: 'Membership',
            amount: 0,
        },
        {
            text: 'Quest',
            amount: 0,
        },
        {
            text: 'F0 Reference',
            amount: 0,
        },
        {
            text: 'F2 Reference',
            amount: 0,
        },
        {
            text: 'Burn GP',
            amount: 0,
        },
        {
            text: 'Burn GP F1, F2',
            amount: 0,
        },
    ];

    return (
        <div className={styles.container}>
            {/* Title */}
            <Title text='Booster' />

            {/* Amount */}
            <Title type='gold' text='0' />

            {/* Info */}
            <div className={styles.grid}>
                {boosters.map((item, index) => (
                    <CustomCard key={index} className={styles.item}>
                        <div className={styles.amount}>{item.amount}</div>
                        <div className={styles.text}>{item.text}</div>
                    </CustomCard>
                ))}
            </div>
        </div>
    );
};

export default BoosterPage;
