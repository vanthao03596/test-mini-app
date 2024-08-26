import { CustomCard } from '@/components/ui/CustomCard';
import { Flex } from '@/components/ui/Flex';
import { List, Modal } from 'antd-mobile';
import clsx from 'clsx';
import { useState } from 'react';
import styles from './MiningSpeed.module.scss';
import axiosAuth from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

type MiningSpeedProps = {
    gasPrice: number;
    level: number;
};

type MiningSpeedResponse = {
    info: {
        [key: number]: number;
    };
};

const ModalContent = ({ level }: Pick<MiningSpeedProps, 'level'>) => {
    const getMiningSpeed = async () => {
        const res = await axiosAuth.get<MiningSpeedResponse>('/mint-lvl');
        return res.data;
    };

    const { data, isLoading } = useQuery({
        queryKey: ['get-mint-lv'],
        queryFn: getMiningSpeed,
    });

    if (isLoading || !data?.info) return;

    const baseMiningSpeed = Object.keys(data?.info)
        .map(Number)
        .map((item) => ({
            level: item,
            speed: data?.info[item],
        }));

    return (
        <div className={styles.modal}>
            <div className={styles.title}>Mining Rules</div>
            <List mode='card' className={styles.list}>
                {baseMiningSpeed.map((item) => (
                    <List.Item
                        className={clsx({
                            [styles.item]: true,
                            [styles.active]: item.level === level,
                        })}
                        key={item.level}
                    >
                        <Flex justify='space-between'>
                            <div className={styles.level}>Level {item.level}</div>
                            <div className={styles.speed}>{item.speed.toFixed(2)} GXP</div>
                        </Flex>
                    </List.Item>
                ))}
            </List>
        </div>
    );
};

const MiningSpeed = (props: MiningSpeedProps) => {
    const { level, gasPrice } = props;

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    return (
        <>
            <CustomCard
                className={clsx(styles.card, styles.left)}
                onClick={() => {
                    setIsModalOpen(true);
                }}
            >
                <div className={styles.amount}>{gasPrice.toFixed(2)} GXP</div>
                <div className={styles.text}>Mining speed</div>
            </CustomCard>

            <Modal
                visible={isModalOpen}
                content={<ModalContent level={level} />}
                closeOnMaskClick
                showCloseButton
                onClose={() => {
                    setIsModalOpen(false);
                }}
            />
        </>
    );
};

export default MiningSpeed;
