import { CustomCard } from '@/components/ui/CustomCard';
import useQuiz from '@/hooks/useQuiz';
import axiosAuth from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';
import { Button, CheckList, ProgressBar, Space, Toast } from 'antd-mobile';
import { CheckListValue } from 'antd-mobile/es/components/check-list';
import { AxiosError } from 'axios';
import { useState } from 'react';
import styles from './QuizDetail.module.scss';
import { Flex } from '@/components/ui/Flex';
import { TablerChevronLeft, TablerChevronRight } from '@/components/icon';

type AnswerType = {
    questionId: number;
    choose: number;
};

const QuizDetail = () => {
    const { data } = useQuiz();
    const [index, setIndex] = useState<number>(0);
    const [answers, setAnswers] = useState<AnswerType[]>([]);

    const submitQuiz = async () => {
        const res = await axiosAuth.post('');
        return res.data;
    };

    const quizMutation = useMutation({
        mutationKey: ['submit-quiz'],
        mutationFn: submitQuiz,
        onSuccess: () => {},
        onError: (error) => {
            if (error instanceof AxiosError) {
                Toast.show({
                    icon: 'fail',
                    content: error.response?.data.message,
                });
            }
        },
    });

    if (!data) return;
    const quiz = data?.quizz.questions;
    const currentQuiz = quiz[index];

    const getCurrentValue = () => {
        const item = answers.find((item) => item.questionId === currentQuiz.id);
        if (item) return [item.choose];
        else return [];
    };

    const handleCheckListChange = (val: CheckListValue[]) => {
        const checked = val.length > 0;
        const value = val[0] as number;
        const hasChoose = answers.some((item) => item.questionId === currentQuiz.id);

        if (hasChoose) {
            if (checked) {
                const newAnswers = answers.map((item) => {
                    if (item.questionId === currentQuiz.id) {
                        return {
                            questionId: item.questionId,
                            choose: value,
                        };
                    } else return item;
                });
                setAnswers(newAnswers);
            } else {
                setAnswers(answers.filter((item) => item.questionId !== currentQuiz.id));
            }
        } else {
            setAnswers((prev) => [
                ...prev,
                {
                    questionId: currentQuiz.id,
                    choose: value,
                },
            ]);
        }
    };

    const handleNavigate = (action: 'next' | 'back') => {
        action === 'next' ? setIndex(index + 1) : setIndex(index - 1);
    };

    const handleSubmit = () => {
        quizMutation.mutate();
    };

    return (
        <div className={styles.container}>
            <div className={styles.quiz}>
                <div className={styles.question}>
                    Question {index + 1}: {currentQuiz.question}
                </div>
                <CustomCard>
                    <CheckList mode='card' value={getCurrentValue()} onChange={handleCheckListChange}>
                        {currentQuiz.answers.map((item, index) => (
                            <CheckList.Item key={index} value={index}>
                                {item}
                            </CheckList.Item>
                        ))}
                    </CheckList>
                </CustomCard>
                <ProgressBar percent={((index + 1) / quiz.length) * 100} text={`${index + 1} / ${quiz.length}`} />
            </div>

            {/* Button */}
            <Flex gap={8} className={styles.btnContainer}>
                {index > 0 && (
                    <Button color='primary' fill='outline' block onClick={() => handleNavigate('back')}>
                        <Space align='center'>
                            <Flex align='center' justify='center'>
                                <TablerChevronLeft />
                            </Flex>
                            <div>Back</div>
                        </Space>
                    </Button>
                )}

                {index < quiz.length - 1 && (
                    <Button color='primary' fill='outline' block onClick={() => handleNavigate('next')}>
                        <Space align='center'>
                            <div>Next</div>
                            <Flex align='center' justify='center'>
                                <TablerChevronRight />
                            </Flex>
                        </Space>
                    </Button>
                )}

                {index === quiz.length - 1 && (
                    <Button color='primary' fill='solid' block onClick={() => handleSubmit()}>
                        Submit
                    </Button>
                )}
            </Flex>
        </div>
    );
};

export default QuizDetail;
