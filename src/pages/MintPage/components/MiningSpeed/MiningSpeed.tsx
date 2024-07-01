import { CustomCard } from '@/components/ui/CustomCard';
import { Flex } from '@/components/ui/Flex';
import { List, Modal } from 'antd-mobile';
import clsx from 'clsx';
import { useState } from 'react';
import styles from './MiningSpeed.module.scss';

type MiningSpeedProps = {
    gemInSecond: number;
    level: number;
};

const indexArray = Array.from({ length: 100 }, (_, i) => i + 1); // Return [1, 2, 3, ..., 99, 100]
const baseMiningSpeed = indexArray.map((item) => ({
    level: item,
    speed: 1 + (item - 1) * 0.09,
}));

const ModalContent = ({ level }: Pick<MiningSpeedProps, 'level'>) => {
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
    const { gemInSecond, level } = props;

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    return (
        <>
            <CustomCard
                className={clsx(styles.card, styles.left)}
                onClick={() => {
                    setIsModalOpen(true);
                }}
            >
                <div className={styles.amount}>{(gemInSecond * 3600).toFixed(2)} GXP</div>
                <div className={styles.text}>Mining mining speed</div>
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
