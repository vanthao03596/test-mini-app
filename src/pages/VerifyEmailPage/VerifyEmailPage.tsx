import { CustomCard } from '@/components/ui/CustomCard';
import { Flex } from '@/components/ui/Flex';
import useUser from '@/hooks/useUser';
import axiosAuth from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';
import { Button, Divider, Input, PasscodeInput, Toast } from 'antd-mobile';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCountdown } from 'usehooks-ts';
import styles from './VerifyEmailPage.module.scss';
import { TablerMail } from '@/components/icon';

const RESEND_TIME = 60;

const VerifyEmailPage = () => {
    const [code, setCode] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [hasEmail, setHasEmail] = useState<boolean>(false);
    const [isSent, setIsSent] = useState<boolean>(false);
    const user = useUser();

    const navigate = useNavigate();
    const [count, { startCountdown, resetCountdown }] = useCountdown({
        countStart: RESEND_TIME,
    });

    const sendCode = async () => {
        const res = await axiosAuth.post('/user/send-code-verify', {
            email: email,
        });

        return res.data;
    };

    const verifyCode = async () => {
        const res = await axiosAuth.post('/user/verify-code', {
            email: email,
            code: code,
        });

        return res.data;
    };

    const codeMutation = useMutation({
        mutationKey: ['send-code-verify'],
        mutationFn: sendCode,
        onSuccess: () => {
            resetCountdown();
            startCountdown();
            setIsSent(true);
            setCode('');
            Toast.show({
                icon: 'success',
                content: (
                    <div className={styles.successModal}>
                        We've sent a code to <div>{email}</div>
                    </div>
                ),
            });
        },
        onError: (error) => {
            if (error instanceof AxiosError) {
                Toast.show({
                    icon: 'fail',
                    content: <div className={styles.errorModal}>{error.response?.data.message}</div>,
                });
            }
        },
    });

    const verifyMutation = useMutation({
        mutationKey: ['verify-code'],
        mutationFn: verifyCode,
        onSuccess: () => {
            Toast.show({
                icon: 'success',
                content: <div className={styles.successModal}>Verify email success</div>,
            });
            navigate('/wallet/withdraw');
        },
        onError: (error) => {
            if (error instanceof AxiosError) {
                Toast.show({
                    icon: 'fail',
                    content: <div className={styles.errorModal}>{error.response?.data.message}</div>,
                });
                setCode('');
            }
        },
    });

    const handleEmailChange = (value: string) => {
        setEmail(value);
    };

    const handleCodeChange = (value: string) => {
        setCode(value);
    };

    const handleSendCode = () => {
        if (email) {
            startCountdown();
            codeMutation.mutate();
        } else {
            Toast.show({
                icon: 'fail',
                content: <div className={styles.errorModal}>Please enter your email</div>,
            });
        }
    };

    const handleResendCode = () => {
        codeMutation.mutate();
    };

    const handleVerifyCode = () => {
        if (code) {
            verifyMutation.mutate();
        } else {
            Toast.show({
                icon: 'fail',
                content: <div className={styles.errorModal}>Please enter your code</div>,
            });
        }
    };

    const handleChangeEmailAddress = () => {
        setEmail('');
        setIsSent(false);
    };

    useEffect(() => {
        if (user?.email) {
            setEmail(user.email);
            setHasEmail(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    useEffect(() => {
        if (hasEmail) {
            setIsSent(true);
            handleSendCode();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasEmail]);

    if (!user) return;

    return (
        <div className={styles.container}>
            {/* Email */}
            <div className={styles.emailContainer}>
                <div className={styles.title}>Verify your email</div>
                <CustomCard>
                    <Input
                        placeholder='abc@gmail.com'
                        clearable
                        disabled={isSent}
                        value={email}
                        onChange={handleEmailChange}
                    />
                </CustomCard>

                {isSent ? (
                    <Flex align='center' justify='center' className={styles.action} onClick={handleChangeEmailAddress}>
                        <div>Click to change email</div>
                        <Flex align='center' justify='center' className={styles.icon}>
                            <TablerMail />
                        </Flex>
                    </Flex>
                ) : (
                    <Button color='primary' loading={codeMutation.isPending} disabled={codeMutation.isPending} fill='solid' block onClick={handleSendCode}>
                        Send code
                    </Button>
                )}
            </div>

            <Divider></Divider>
            {/* Code */}
            {isSent && (
                <div className={styles.codeContainer}>
                    {/* Title */}
                    <Flex align='center' justify='center'>
                        <div className={styles.title}>Please enter the code that sent to your email address </div>
                    </Flex>

                    {/* Input */}
                    <Flex align='center' justify='center'>
                        <PasscodeInput plain value={code} onChange={handleCodeChange} />
                    </Flex>

                    {/* Resend */}
                    <Flex align='center' justify='center' className={styles.resend}>
                        <div className={styles.text}>Didn't receive an email?</div>

                        {count ? (
                            <div className={styles.action}>{count}s</div>
                        ) : (
                            <div className={styles.action} onClick={handleResendCode}>
                                Resend
                            </div>
                        )}
                    </Flex>

                    {/* Submit */}
                    <Button color='primary' loading={verifyMutation.isPending} disabled={verifyMutation.isPending} fill='solid' block onClick={handleVerifyCode}>
                        Submit
                    </Button>
                </div>
            )}
        </div>
    );
};

export default VerifyEmailPage;
