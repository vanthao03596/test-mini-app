import { TablerNetwork } from '@/components/icon';
import { CustomCard } from '@/components/ui/CustomCard';
import { Flex } from '@/components/ui/Flex';
import { Divider, Space } from 'antd-mobile';
import styles from './NetworkInfo.module.scss';

const TOTAL = 123;
const F1 = 100;
const F2 = 23;

const NetworkInfo = () => {
    return (
        <CustomCard className={styles.card}>
            <div className={styles.wrapper}>
                {/* Title */}
                <div className={styles.title}>Your network</div>

                {/* Total */}
                <Space align='center' className={styles.total}>
                    <div className={styles.text}>{TOTAL}</div>
                    <Flex align='center'>
                        <TablerNetwork className={styles.icon} />
                    </Flex>
                </Space>

                {/* Detail */}
                <div className={styles.detail}>View detail</div>

                {/* Divider */}
                <Divider className={styles.divider} />

                {/* Analytic */}
                <Flex justify='space-evenly' align='center' className={styles.analytic}>
                    <Space align='center'>
                        <div className={styles.text}>{F1}</div>
                        <div>F1</div>
                    </Space>
                    <Space align='center'>
                        <div className={styles.text}>{F2}</div>
                        <div>F2</div>
                    </Space>
                </Flex>
            </div>
        </CustomCard>
    );
};

export default NetworkInfo;
