import { Title } from '@/components/ui/Title';
import axiosAuth from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Form, Input, Toast } from 'antd-mobile';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.scss';
import { User } from '@/types/public.types';

const LoginPage = () => {
    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const updateUser = async (address: string) => {
        const res = await axiosAuth.post<{
            user: User;
        }>('/user/info', { address });
        return res.data;
    };

    const mutation = useMutation({
        mutationKey: ['update-user'],
        mutationFn: updateUser,
        onSuccess: async (data) => {
            Toast.show({
                icon: 'success',
                content: 'Login success',
            });
            queryClient.setQueryData(['get-user'], data);
            setTimeout(() => {
                navigate('/');
            }, 200);
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

    const onFinish = (values: any) => {
        mutation.mutate(values.address);
    };

    return (
        <div className={styles.container}>
            <Title text='Let&prime;s start' type='subtitle' />

            <Form
                layout='vertical'
                onFinish={onFinish}
                footer={
                    <Button block type='submit' color='primary' size='large'>
                        Continue
                    </Button>
                }
            >
                <Form.Item
                    label='Your Metamask Wallet Address'
                    name='address'
                    rules={[
                        {
                            validator(_, value) {
                                if (!value) {
                                    return Promise.reject(new Error('Required'));
                                }

                                if (!String(value).startsWith('0x')) {
                                    return Promise.reject(new Error('Wallet must start with 0x'));
                                }

                                return Promise.resolve();
                            },
                        },
                    ]}
                >
                    <Input placeholder='0x . . .' clearable />
                </Form.Item>

                <Form.Item>
                    <div className={styles.noti}>
                        Make sure this wallet address supports Base Chain. This address cannot be changed in the future
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
};

export default LoginPage;
