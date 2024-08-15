import IMAGES from '@/assets/images';
import { TablerCheck, TablerChevronRight } from '@/components/icon';
import { Flex } from '@/components/ui/Flex';
import axiosAuth from '@/lib/axios';
import { formatAmount } from '@/utils/formatCurrency';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Avatar, Button, Ellipsis, Image, Input, List, Modal, Toast } from 'antd-mobile';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useCountdown } from 'usehooks-ts';
import styles from './TaskItem.module.scss';
import { SocialTask } from '../../SocialTaskPage';

const COUNTDOWN_TIME = 10;
const listHasInput = ['LikeATweet', 'RetweetTwitter', 'FollowTiktok', 'QuoteTweetAndHashTag', 'FollowTwitter'];

type TaskItemProps = SocialTask & {
    complete?: boolean;
};

const TaskItem = (props: TaskItemProps) => {
    const { id, social, name, reward, link, template_id, complete } = props;
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isPending, setIsPending] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    const [count, { startCountdown, resetCountdown }] = useCountdown({
        countStart: COUNTDOWN_TIME,
    });
    const queryClient = useQueryClient();

    const canCheck = !isPending && count === 0;
    const logo = (IMAGES.social as any)[social];
    const hasUsername = listHasInput.includes(template_id);

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsPending(false);
        setUsername('');
        resetCountdown();
    };

    const handleOpenModal = () => {
        if (!complete) {
            setIsModalOpen(true);
        }
    };

    const handleClick = () => {
        if (!canCheck) {
            window.Telegram.WebApp.openLink(link);
            startCountdown();
            setIsPending(true);
        } else {
            handleSubmit();
        }
    };

    const handleChangeUsername = (value: string) => {
        setUsername(value);
    };

    const verifyTask = async () => {
        const res = await axiosAuth.post('/verify-task', {
            task_id: id,
            username: username,
        });

        return res.data;
    };

    const taskMutation = useMutation({
        mutationKey: ['verify-social-task'],
        mutationFn: verifyTask,
        onSuccess: async (data) => {
            if (data.status) {
                await queryClient.invalidateQueries({ queryKey: ['get-complete-social-task'] });
                Toast.show({
                    icon: 'success',
                    content: 'Task completed',
                });
                handleCloseModal();
            } else {
                Toast.show({
                    icon: 'fail',
                    content: data.message,
                });
            }
        },
        onError: (error) => {
            if (error instanceof AxiosError) {
                Toast.show({
                    icon: 'fail',
                    content: error.response?.data.message,
                });
            }
        },
    });

    const handleSubmit = () => {
        taskMutation.mutate();
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
                    <div>+{formatAmount(reward)} GXP</div>
                    <Image src='/gemx-crypto.png' width={24} height={24} fit='cover' className={styles.icon} />
                </Flex>

                {/* If have to enter `username` */}
                {canCheck && hasUsername && (
                    <Input
                        value={username}
                        placeholder='ENTER YOUR USERNAME'
                        clearable
                        onChange={handleChangeUsername}
                        className={styles.input}
                    />
                )}

                {/* Submit */}
                <Button
                    color='primary'
                    fill='solid'
                    block
                    disabled={isPending || (canCheck && hasUsername && !username)}
                    loading={taskMutation.isPending}
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
                extra={complete ? <TablerCheck className={styles.iconSuccess} /> : <TablerChevronRight />}
                description={
                    <Flex align='center'>
                        <Image src='/gemx-crypto.png' width={24} height={24} fit='cover' className={styles.iconLogo} />
                        <div>+{formatAmount(reward)} GXP</div>
                    </Flex>
                }
                clickable={false}
                className={styles.item}
                onClick={handleOpenModal}
            >
                <Ellipsis content={name} />
            </List.Item>

            <Modal visible={isModalOpen} content={modalContent} showCloseButton onClose={handleCloseModal} />
        </>
    );
};

export default TaskItem;
