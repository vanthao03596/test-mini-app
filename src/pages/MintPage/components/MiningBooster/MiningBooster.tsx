import { TablerArrowBadgeUp, TablerRocket } from '@/components/icon';
import { CustomCard } from '@/components/ui/CustomCard';
import { Flex } from '@/components/ui/Flex';
import useMembership from '@/hooks/useMembership';
import { Space } from 'antd-mobile';
import { Link } from 'react-router-dom';
import styles from './MiningBooster.module.scss';

type MiningBoosterProps = {
    gasPower: number;
};

const MiningBooster = ({ gasPower }: MiningBoosterProps) => {
    const { data: membershipData } = useMembership();

    return (
        <CustomCard className={styles.card}>
            {membershipData?.memberships.length !== 2 && (
                <Space className={styles.update}>
                    <Link to='/wallet/booster-plus'>Update</Link>
                    <Flex align='center' justify='center'>
                        <TablerArrowBadgeUp />
                    </Flex>
                </Space>
            )}

            <Link to='/booster'>
                <Flex className={styles.amount} align='center'>
                    {gasPower}%
                    <TablerRocket className={styles.icon} />
                </Flex>
                <div className={styles.text}>Booster coefficient</div>
            </Link>
        </CustomCard>
    );
};

export default MiningBooster;
