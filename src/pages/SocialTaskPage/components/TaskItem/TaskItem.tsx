import IMAGES from '@/assets/images';
import { TablerCheck, TablerChevronRight } from '@/components/icon';
import { CustomCard } from '@/components/ui/CustomCard';
import { Flex } from '@/components/ui/Flex';
import axiosAuth from '@/lib/axios';
import { SocialTask } from '@/types/public.types';
import { formatAmount } from '@/utils/formatCurrency';
import {
    Avatar,
    Button,
    CheckList,
    Ellipsis,
    Image,
    ImageUploader,
    ImageUploadItem,
    Input,
    List,
    Modal,
} from 'antd-mobile';
import { CheckListValue } from 'antd-mobile/es/components/check-list';
import { useEffect, useState } from 'react';
import { useCountdown } from 'usehooks-ts';
import styles from './TaskItem.module.scss';
import useVerifyTask from '@/hooks/useVerifyTask';

const COUNTDOWN_TIME = 10;
const listHasInput = ['LikeATweet', 'RetweetTwitter', 'FollowTiktok', 'QuoteTweetAndHashTag', 'FollowTwitter'];

type TaskItemProps = SocialTask & {
    complete?: boolean;
};

const TaskItem = (props: TaskItemProps) => {
    const { id, social, name, reward, link, template_id, complete, params } = props;
    const [fileList, setFileList] = useState<ImageUploadItem[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isPending, setIsPending] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    const [data, setData] = useState<string>('');
    const [count, { startCountdown, resetCountdown }] = useCountdown({
        countStart: COUNTDOWN_TIME,
    });

    const canCheck = (!isPending && count === 0) || social === 'gemx';
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
            if (template_id === 'JoinTelegram') {
                window.Telegram.WebApp.openTelegramLink(link);
            } else {
                window.open(link, '_blank');
            }
            startCountdown();
            setIsPending(true);
        } else {
            verifyTask();
        }
    };

    const handleChangeUsername = (value: string) => {
        setUsername(value);
    };

    const handleChangeData = (value: string) => {
        setData(value);
    };

    const handleUploadImage = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axiosAuth.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return {
                url: res.data.url,
            };
        } catch (error) {
            throw new Error('Fail');
        }
    };

    const handleAnswersChange = (value: CheckListValue[]) => {
        setData(String(value));
    };

    const { mutate: verifyTask, isPending: isVerifyTaskPending } = useVerifyTask(
        id,
        data,
        username,
        fileList,
        handleCloseModal
    );

    // Change button to submit if pending done
    useEffect(() => {
        if (count === 0) {
            setIsPending(false);
        }
    }, [count]);

    const modalContent = (
        <div className={styles.modal}>
            <Flex justify='center' align='center' direction='column' className={styles.layout}>
                <Image src={logo} width={'33.3333%'} />
                <div className={styles.name}>{name}</div>
                {params?.description && <div className={styles.description}>{params.description}</div>}

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

                {template_id === 'JoinTelegram' && (
                    <p className={styles.textDanger}>Try rejoining the group if verification fails</p>
                )}

                {social === 'gemx' &&
                    (template_id === 'SendImage' ? (
                        <ImageUploader
                            value={fileList}
                            onChange={setFileList}
                            upload={handleUploadImage}
                            maxCount={1}
                        />
                    ) : template_id === 'ChooseCorrectAnswer' ? (
                        <div className={styles.chooseCorrectAnswer}>
                            {/* Question */}
                            <div className={styles.question}>Question: {params.question}</div>

                            {/* Answers */}
                            <CustomCard>
                                <CheckList
                                    mode='card'
                                    value={data ? [Number(data)] : []}
                                    onChange={handleAnswersChange}
                                >
                                    {params.answers?.map((item, index) => (
                                        <CheckList.Item key={index} value={index}>
                                            {item.text}
                                        </CheckList.Item>
                                    ))}
                                </CheckList>
                            </CustomCard>
                        </div>
                    ) : template_id === 'DailyCheckin' ? null : (
                        <>
                            {params.question && <div className={styles.question}>Question: {params.question}</div>}
                            <Input value={data} placeholder='ENTER HERE' clearable onChange={handleChangeData} />
                        </>
                    ))}

                {/* Submit */}
                <Button
                    color='primary'
                    fill='solid'
                    block
                    disabled={
                        isPending ||
                        (canCheck && hasUsername && !username) ||
                        (template_id === 'DailyCheckin' && !canCheck)
                    }
                    loading={isVerifyTaskPending}
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
                        <div className={styles.rewardText}>+{formatAmount(reward)} GXP</div>
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
