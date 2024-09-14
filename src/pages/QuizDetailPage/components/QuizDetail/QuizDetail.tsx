import { TablerChevronLeft, TablerChevronRight } from '@/components/icon';
import { CustomCard } from '@/components/ui/CustomCard';
import { Flex } from '@/components/ui/Flex';
import useQuiz from '@/hooks/useQuiz';
import useQuizSession from '@/hooks/useQuizSession';
import axiosAuth from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, CheckList, ProgressBar, ResultPage, Space, Toast } from 'antd-mobile';
import { CheckListValue } from 'antd-mobile/es/components/check-list';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './QuizDetail.module.scss';

type AnswerType = {
    question_id: number;
    choose: number;
};

type QuizSubmitResponse = {
    session: {
        id: number;
        quizz_id: number;
        user_id: number;
        start_time: Date;
        end_time: Date;
        duration: number;
        total_correct: number;
        created_at: Date;
        updated_at: Date;
        answers: QuizSubmitAnswer[];
    };
};

type QuizSubmitAnswer = {
    id: number;
    quiz_session_id: number;
    question_id: number;
    answer: string;
    is_correct: number;
    created_at: Date;
    updated_at: Date;
};

type QuizDetailProps = {
    isDone: boolean;
    setIsDone: React.Dispatch<React.SetStateAction<boolean>>;
};

const QuizDetail = (props: QuizDetailProps) => {
    const { isDone, setIsDone } = props;
    const { data } = useQuiz();
    const [index, setIndex] = useState<number>(0);
    const { quizId } = useParams();

    const [result, setResult] = useState<QuizSubmitResponse['session']>();
    const [answers, setAnswers] = useState<AnswerType[]>([]);
    const { data: sessionData } = useQuizSession();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const submitQuiz = async () => {
        const res = await axiosAuth.post<QuizSubmitResponse>(`/quizz-session/${sessionData?.session?.id}/complete`, {
            answers: answers,
        });
        return res.data;
    };

    const quizMutation = useMutation({
        mutationKey: ['submit-quiz'],
        mutationFn: submitQuiz,
        onSuccess: (data) => {
            setIsDone(true);
            setResult(data.session);
            queryClient.invalidateQueries({ queryKey: ['get-quiz-session', quizId] });
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

    if (!data) return;
    const quiz = data?.quizz.questions;
    const currentQuiz = quiz[index];

    const getCurrentValue = () => {
        const item = answers.find((item) => item.question_id === currentQuiz.id);
        if (item) return [item.choose];
        else return [];
    };

    const handleCheckListChange = (val: CheckListValue[]) => {
        const checked = val.length > 0;
        const value = val[0] as number;
        const hasChoose = answers.some((item) => item.question_id === currentQuiz.id);

        if (hasChoose) {
            if (checked) {
                const newAnswers = answers.map((item) => {
                    if (item.question_id === currentQuiz.id) {
                        return {
                            question_id: item.question_id,
                            choose: value,
                        };
                    } else return item;
                });
                setAnswers(newAnswers);
            } else {
                setAnswers(answers.filter((item) => item.question_id !== currentQuiz.id));
            }
        } else {
            setAnswers((prev) => [
                ...prev,
                {
                    question_id: currentQuiz.id,
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

    if (isDone) {
        return (
            <ResultPage
                status='success'
                title={`Correct: ${result?.total_correct}`}
                description={
                    <div className={styles.resultDescription}>
                        Congratulations! You've successfully completed the quiz. Here are your results.
                    </div>
                }
                secondaryButtonText='Back to home'
                onSecondaryButtonClick={() => navigate('/')}
                primaryButtonText='Do others quiz'
                onPrimaryButtonClick={() => navigate('/earn/quiz')}
            />
        );
    }

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
