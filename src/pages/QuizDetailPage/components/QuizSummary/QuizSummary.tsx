import { Button, Modal, Toast } from 'antd-mobile';
import styles from './QuizSummary.module.scss';
import { CustomCard } from '@/components/ui/CustomCard';
import useQuiz from '@/hooks/useQuiz';
import { Flex } from '@/components/ui/Flex';
import { TablerCalendarMonth, TablerCoin, TablerUser } from '@/components/icon';
import dayjs from 'dayjs';
import { DATE_FORMAT_TYPE } from '@/constants/public';
import axiosAuth from '@/lib/axios';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const QuizSummary = () => {
    const { data } = useQuiz();
    const { quizId } = useParams();
    const queryClient = useQueryClient();

    const createSession = async () => {
        const res = await axiosAuth.post(`/quizz/${quizId}/session`);
        return res.data;
    };

    const sessionMutation = useMutation({
        mutationKey: ['create-quiz-session'],
        mutationFn: createSession,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-quiz-session'] });
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

    const handleClick = () => {
        sessionMutation.mutate();
    };

    if (!data) return;

    const quiz = data?.quizz;

    return (
        <div className={styles.container}>
            <CustomCard>
                <div className={styles.wrapper}>
                    <div className={styles.title}>{quiz.title}</div>
                    <div className={styles.description}>{quiz.description}</div>
                    {/* Time */}
                    <Flex align='center'>
                        <TablerCalendarMonth className={styles.marginRight} />
                        <div>Start date: {dayjs.utc(quiz.start_date).format(DATE_FORMAT_TYPE)}</div>
                    </Flex>

                    {/* Max users */}
                    <Flex align='center'>
                        <TablerUser className={styles.marginRight} />
                        <div>Max users: {quiz.max_user_join}</div>
                    </Flex>

                    {/* Rewards */}
                    <Flex align='center'>
                        <TablerCoin className={styles.marginRight} />
                        <div>
                            Price join: {quiz.price_join} {quiz.type_reward}
                        </div>
                    </Flex>

                    <Button
                        block
                        fill='solid'
                        color='primary'
                        className={styles.btn}
                        onClick={() => {
                            Modal.confirm({
                                title: 'Pay and join quiz?',
                                confirmText: 'OK',
                                cancelText: 'Cancel',
                                onConfirm: handleClick,
                            });
                        }}
                    >
                        Start (-{quiz.price_join} {quiz.type_reward})
                    </Button>
                </div>
            </CustomCard>
        </div>
    );
};

export default QuizSummary;
