import { TablerNetwork } from '@/components/icon';
import { CustomCard } from '@/components/ui/CustomCard';
import { Flex } from '@/components/ui/Flex';
import { Divider, Space } from 'antd-mobile';
import styles from './NetworkInfo.module.scss';
import axiosAuth from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { User } from '@/types/public.types';

type RefResponse = {
    users: User[];
};

const NetworkInfo = () => {
    const getRef = async (level: 'f1' | 'f2') => {
        const res = await axiosAuth.get<RefResponse>(`/user/ref?lvl=${level}`);
        return res.data;
    };

    const { data: dataF1 } = useQuery({
        queryKey: ['get-f1'],
        queryFn: () => getRef('f1'),
    });

    const { data: dataF2 } = useQuery({
        queryKey: ['get-f2'],
        queryFn: () => getRef('f2'),
    });

    // Extract data
    const usersF1 = dataF1?.users;
    const usersF2 = dataF2?.users;

    return (
        <CustomCard className={styles.card}>
            <div className={styles.wrapper}>
                {/* Title */}
                <div className={styles.title}>Your network</div>

                {/* Total */}
                <Space align='center' className={styles.total}>
                    <div className={styles.text}>{usersF1 && usersF2 && usersF1?.length + usersF2?.length}</div>
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
                        <div className={styles.text}>{usersF1?.length}</div>
                        <div>F1</div>
                    </Space>
                    <Space align='center'>
                        <div className={styles.text}>{usersF2?.length}</div>
                        <div>F2</div>
                    </Space>
                </Flex>
            </div>
        </CustomCard>
    );
};

export default NetworkInfo;
