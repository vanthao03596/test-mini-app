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
        <CustomCard border='normal' className={clsx(styles.card, styles.right)}>
            <Flex className={styles.amount} align='center'>
                {gasPower}
                <Link to={'https://gemx.io/membership'} target='blank' className={styles.icon}>
                    <TablerRocket />
                </Link>
            </Flex>
            <div className={styles.text}>Booster coefficient</div>
        </CustomCard>
    );
};

export default MiningBooster;
