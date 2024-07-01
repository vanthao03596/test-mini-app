import { TablerRocket } from '@/components/icon';
import { CustomCard } from '@/components/ui/CustomCard';
import { Flex } from '@/components/ui/Flex';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import styles from './MiningBooster.module.scss';

type MiningBoosterProps = {
    gasPower: number;
};

const MiningBooster = ({ gasPower }: MiningBoosterProps) => {
    return (
        <CustomCard className={clsx(styles.card, styles.right)}>
            <Link to='/booster'>
                <Flex className={styles.amount} align='center'>
                    {gasPower}
                    <TablerRocket className={styles.icon} />
                </Flex>
                <div className={styles.text}>Booster coefficient</div>
            </Link>
        </CustomCard>
    );
};

export default MiningBooster;
