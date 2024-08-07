import { TablerCopy, TablerInfoCircle } from '@/components/icon';
import { Flex } from '@/components/ui/Flex';
import { Avatar, Modal, Space, Toast } from 'antd-mobile';
import { useState } from 'react';
import { useCopyToClipboard } from 'usehooks-ts';
import styles from './UserInfo.module.scss';

type UserInfoProps = {
    username: string;
    level: number;
    image: string;
    gemInSecond: number;
};

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
    const { level, image, gemInSecond } = props;
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [, copy] = useCopyToClipboard();

    const telegramUsername = Telegram.WebApp.initDataUnsafe.user?.id;

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
                    <Flex align='center'>
                        <div className={styles.username}>{telegramUsername || 'TELEGRAM ID'}</div>
                        <TablerCopy className={styles.icon} onClick={handleCopy} />
                    </Flex>
                    <div>Level {level}</div>
                </div>
            </Flex>

            {/* Rewards */}
            <div className={styles.rewards}>
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
