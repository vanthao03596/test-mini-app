import { Flex } from '@/components/ui/Flex';
import { formatAmount } from '@/utils/formatCurrency';
import { Avatar, Button, Ellipsis, Image, List, Modal } from 'antd-mobile';
import { useEffect, useState } from 'react';
import { SocialTask } from '../../SocialTaskPage';
import styles from './TaskItem.module.scss';
import { TablerChevronRight } from '@/components/icon';
import IMAGES from '@/assets/images';
import { useCountdown } from 'usehooks-ts';

const COUNTDOWN_TIME = 30;

const TaskItem = (props: SocialTask) => {
    const { social, name, reward, link } = props;
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isPending, setIsPending] = useState<boolean>(false);
    const [count, { startCountdown }] = useCountdown({
        countStart: COUNTDOWN_TIME,
    });

    const canCheck = !isPending && count === 0;
    const logo = (IMAGES.social as any)[social];

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsPending(false);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleSubmit = () => {
        console.log('123');
    };

    const handleClick = () => {
        if (!canCheck) {
            window.open(link, '_blank');
            startCountdown();
            setIsPending(true);
        } else {
            handleSubmit();
        }
    };

    // Change button to submit if pending done
    useEffect(() => {
        if (count === 0) {
            setIsPending(false);
        }
    }, [count]);

    const modalContent = (
        <div className={styles.modal}>
            <Flex justify='center' align='center' direction='column' className={styles.layout}>
                {/* Logo */}
                <Image src={logo} width={'33.3333%'} />

                {/* Name */}
                <div className={styles.name}>{name}</div>

                {/* Amount */}
                <Flex align='center'>
                    <div>+{formatAmount(reward)}</div>
                    <Image src='/gemx-crypto.png' width={24} height={24} fit='cover' className={styles.icon} />
                </Flex>

                {/* Submit */}
                <Button
                    color='primary'
                    fill='solid'
                    block
                    disabled={isPending}
                    onClick={handleClick}
                    className={styles.btn}
                >
                    {isPending ? `Pending ${count}s` : canCheck ? 'Check' : 'Start'}
                </Button>
            </Flex>
        </div>
    );

    return (
        <>
            <List.Item
                prefix={<Avatar src={logo} />}
                extra={<TablerChevronRight />}
                description={
                    <Flex align='center'>
                        <Image src='/gemx-crypto.png' width={24} height={24} fit='cover' className={styles.icon} />
                        <div>+{formatAmount(reward)}</div>
                    </Flex>
                }
                clickable={false}
                className={styles.item}
                onClick={handleOpenModal}
            >
                <Ellipsis content={name} />
            </List.Item>

            <Modal
                visible={isModalOpen}
                content={modalContent}
                closeOnMaskClick
                showCloseButton
                onClose={handleCloseModal}
            />
        </>
    );
};

export default TaskItem;
