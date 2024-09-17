import { TablerCopy, TablerEye, TablerInfoCircle } from '@/components/icon';
import { Flex } from '@/components/ui/Flex';
import { Avatar, Modal, Popover, ProgressBar, Space, Toast } from 'antd-mobile';
import { useState } from 'react';
import { useCopyToClipboard } from 'usehooks-ts';
import styles from './UserInfo.module.scss';

type UserInfoProps = {
    username: string;
    level: number;
    image: string;
    gemInSecond: number;
    gxpEarn: string;
    nextLvlGxp: number;
    totalRead: number;
};

const readConditions = [
    {
        level: 10,
        total: 50,
    },
    {
        level: 20,
        total: 100,
    },
    {
        level: 30,
        total: 150,
    },
    {
        level: 40,
        total: 250,
    },
    {
        level: 50,
        total: 400,
    },
    {
        level: 60,
        total: 600,
    },
    {
        level: 70,
        total: 900,
    },
    {
        level: 80,
        total: 1500,
    },
    {
        level: 90,
        total: 2500,
    },
    {
        level: 90,
        total: 4000,
    },
];

const ModalContent = () => {
    return (
        <div className={styles.modal}>
            <div className={styles.title}>Mining Rules</div>
            <ul>
                <li>User can receive rewards once every 6 hours</li>
                <li>The mining process will automatically stop if users do not receive rewards within 24 hours</li>
            </ul>
        </div>
    );
};

const UserInfo = (props: UserInfoProps) => {
    const { level, image, gemInSecond, gxpEarn, nextLvlGxp, totalRead } = props;
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [, copy] = useCopyToClipboard();

    const telegramUsername = Telegram.WebApp.initDataUnsafe.user?.id;
    const readItem = readConditions.find((item) => item.level === totalRead + 1);

    const handleCopy = () => {
        if (telegramUsername) {
            copy(String(telegramUsername));
            Toast.show({
                icon: 'success',
                content: 'Copy success',
            });
        } else {
            Toast.show({
                icon: 'fail',
                content: 'Copy fail',
            });
        }
    };

    return (
        <Flex align='center' justify='space-between' className={styles.container}>
            {/* Info */}
            <Flex align='center' className={styles.info}>
                <Avatar src={image} className={styles.avatar} />
                <div className={styles.text}>
                    {/* Level */}
                    <div>Level {level}</div>
                    <div className={styles.progress}>
                        <ProgressBar percent={(Number(gxpEarn) / Number(nextLvlGxp)) * 100} />
                        <div className={styles.number}>
                            {gxpEarn} / {nextLvlGxp} EXP
                        </div>
                    </div>

                    {/* Read condition */}
                    {readItem && (
                        <>
                            <div className={styles.progress}>
                                <ProgressBar percent={(totalRead / readItem.total) * 100} />
                                <div className={styles.number}>
                                    <Space align='center'>
                                        <div>
                                            {totalRead} / {readItem.total}
                                        </div>
                                        <Popover
                                            content={`Read at least ${readItem.total} research to up your level`}
                                            trigger='click'
                                            mode='dark'
                                            placement='bottom'
                                        >
                                            <Flex align='center'>
                                                <TablerEye className={styles.icon} />
                                            </Flex>
                                        </Popover>
                                    </Space>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </Flex>

            {/* Rewards */}
            <div className={styles.rewards}>
                {/* Telegram ID */}
                <Flex align='center'>
                    <div className={styles.username}>{telegramUsername || 'TELEGRAM ID'}</div>
                    <TablerCopy className={styles.icon} onClick={handleCopy} />
                </Flex>

                {/* Price */}
                <div className={styles.price}>{(gemInSecond * 3600).toFixed(2)}</div>

                {/* Tip */}
                <Space align='center' className={styles.tip}>
                    <div className={styles.text}>PER HOUR</div>
                    {/* Icon */}
                    <Flex
                        align='center'
                        onClick={() => {
                            setIsModalOpen(true);
                        }}
                        className={styles.icon}
                    >
                        <TablerInfoCircle />
                    </Flex>

                    {/* Modal */}
                    <Modal
                        visible={isModalOpen}
                        content={<ModalContent />}
                        closeOnAction
                        closeOnMaskClick
                        onClose={() => {
                            setIsModalOpen(false);
                        }}
                        actions={[
                            {
                                key: 'confirm',
                                text: 'OK',
                                primary: true,
                            },
                        ]}
                    />
                </Space>
            </div>
        </Flex>
    );
};

export default UserInfo;
