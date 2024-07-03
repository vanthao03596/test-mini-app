import { TablerChevronRight } from '@/components/icon';
import { CustomList } from '@/components/ui/CustomList';
import { Flex } from '@/components/ui/Flex';
import { Title } from '@/components/ui/Title';
import { Avatar, Button, Ellipsis, Image, List, Modal } from 'antd-mobile';
import { useState } from 'react';
import styles from './SocialTaskPage.module.scss';
import { formatAmount } from '@/utils/formatCurrency';
import axiosAuth from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

type Task = {
    id: number;
    name: string;
    logo: string;
    reward: number;
    link: string;
};

const tasks: Task[] = [
    {
        id: 1,
        name: 'Join Telegram Channel',
        logo: '',
        reward: 5000,
        link: '',
    },
    {
        id: 2,
        name: 'Join Telegram Community',
        logo: '',
        reward: 5000,
        link: '',
    },
    {
        id: 3,
        name: 'Follow X',
        logo: '',
        reward: 5000,
        link: '',
    },
    {
        id: 4,
        name: 'Like & Retweet This Post',
        logo: '',
        reward: 5000,
        link: '',
    },
    {
        id: 5,
        name: 'Follow Our CEO',
        logo: '',
        reward: 5000,
        link: '',
    },
    {
        id: 6,
        name: 'Join Discord',
        logo: '',
        reward: 5000,
        link: '',
    },
    {
        id: 7,
        name: 'Subscribe Youtube',
        logo: '',
        reward: 5000,
        link: '',
    },
    {
        id: 8,
        name: 'View website',
        logo: '',
        reward: 5000,
        link: '',
    },
    {
        id: 9,
        name: 'Follow Fanpage',
        logo: '',
        reward: 5000,
        link: '',
    },
    {
        id: 10,
        name: 'Join Facebook Group',
        logo: '',
        reward: 5000,
        link: '',
    },
    {
        id: 11,
        name: 'Follow Tiktok',
        logo: '',
        reward: 5000,
        link: '',
    },
];

const TaskItem = (props: Task) => {
    const { logo, name, reward, link } = props;
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [canCheck, setCanCheck] = useState<boolean>(false);

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCanCheck(false);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleClick = () => {
        if (!canCheck) {
            // Change state to "Check"
            setCanCheck(true);
            window.open(link, '_blank');
        } else {
            // Submit
        }
    };

    const modalContent = (
        <div className={styles.modal}>
            <Flex justify='center' align='center' direction='column' className={styles.layout}>
                <Image src={logo} width={'50%'} />
                <div>{name}</div>
                <Flex align='center'>
                    <div>+{formatAmount(reward)}</div>
                    <Image src='/gemx-crypto.png' width={24} height={24} fit='cover' className={styles.icon} />
                </Flex>

                <Button color='primary' fill='solid' block onClick={handleClick} className={styles.btn}>
                    {canCheck ? 'Check' : 'Start'}
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

const SocialTaskPage = () => {
    const getSocialTask = async () => {
        const res = await axiosAuth.get('/social-task');
        return res.data;
    };

    const { data } = useQuery({
        queryKey: ['get-social-task'],
        queryFn: getSocialTask,
    });

    console.log('data', data);

    return (
        <div className={styles.container}>
            <Title text='Social task' />

            <CustomList>
                {tasks.map((item) => (
                    <TaskItem key={item.id} {...item} />
                ))}
            </CustomList>
        </div>
    );
};

export default SocialTaskPage;
