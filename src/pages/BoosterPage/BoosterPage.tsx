import { Title } from '@/components/ui/Title';
import styles from './BoosterPage.module.scss';
import { CustomCard } from '@/components/ui/CustomCard';
import axiosAuth from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

type BoosterResponse = Record<'f1' | 'f2' | 'membership' | 'quest' | 'total', number>;

const BoosterPage = () => {
    const getBooster = async () => {
        const res = await axiosAuth.get<BoosterResponse>('/booster-info');
        return res.data;
    };

    const { data } = useQuery({
        queryKey: ['get-booster'],
        queryFn: getBooster,
    });

    const boosters = [
        {
            text: 'Membership',
            amount: data?.membership,
        },
        {
            text: 'Quest',
            amount: data?.quest,
        },
        {
            text: 'F1 Reference',
            amount: data?.f1,
        },
        {
            text: 'F2 Reference',
            amount: data?.f2,
        },
    ];

    return (
        <div className={styles.container}>
            {/* Title */}
            <Title text='Booster' />

            {/* Amount */}
            <Title type='gold' text={data ? `${data.total}%` : ''} />

            {/* Info */}
            <div className={styles.grid}>
                {boosters.map((item, index) => (
                    <CustomCard key={index} className={styles.item}>
                        <div className={styles.amount}>{item.amount}%</div>
                        <div className={styles.text}>{item.text}</div>
                    </CustomCard>
                ))}
            </div>
        </div>
    );
};

export default BoosterPage;
