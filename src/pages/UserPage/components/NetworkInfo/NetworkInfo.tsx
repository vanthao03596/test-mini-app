import { TablerNetwork } from '@/components/icon';
import { CustomCard } from '@/components/ui/CustomCard';
import { Flex } from '@/components/ui/Flex';
import useReference from '@/hooks/useReference';
import { Space } from 'antd-mobile';
import { Link } from 'react-router-dom';
import styles from './NetworkInfo.module.scss';

const NetworkInfo = () => {
    const { listF1, listF2 } = useReference();

    return (
        <CustomCard className={styles.card}>
            <div className={styles.wrapper}>
                {/* Title */}
                <div className={styles.title}>Your network</div>

                {/* Total */}
                <Space align='center' className={styles.total}>
                    <div className={styles.text}>{listF1 && listF2 && listF1?.length + listF2?.length}</div>
                    <Flex align='center'>
                        <TablerNetwork className={styles.icon} />
                    </Flex>
                </Space>

                {/* Detail */}
                <div className={styles.detail}>
                    <Link to='/reference'>View detail</Link>
                </div>

                {/* Divider */}
                {/* <Divider className={styles.divider} /> */}

                {/* Analytic */}
                {/* <Flex justify='space-evenly' align='center' className={styles.analytic}>
                    <Space align='center'>
                        <div className={styles.text}>{listF1?.length}</div>
                        <div>F1</div>
                    </Space>
                    <Space align='center'>
                        <div className={styles.text}>{listF2?.length}</div>
                        <div>F2</div>
                    </Space>
                </Flex> */}
            </div>
        </CustomCard>
    );
};

export default NetworkInfo;
