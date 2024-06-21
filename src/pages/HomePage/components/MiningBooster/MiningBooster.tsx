import { TablerRocket } from '@/components/icon';
import { Flex } from '@/components/ui/Flex';
import { Card } from 'antd-mobile';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import styles from './MiningBooster.module.scss';

type MiningBoosterProps = {
    gasPower: number;
};

const MiningBooster = ({ gasPower }: MiningBoosterProps) => {
    return (
        <Card className={clsx(styles.card, styles.right)}>
            <Flex className={styles.amount} align='center'>
                {gasPower}
                <Link to={'https://gemx.io/membership'} target='blank' className={styles.icon}>
                    <TablerRocket />
                </Link>
            </Flex>
            <div className={styles.text}>Booster coefficient</div>
        </Card>
    );
};

export default MiningBooster;
