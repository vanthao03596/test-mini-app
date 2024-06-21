import { Title } from '@/components/ui/Title';
import axiosAuth from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input, Toast } from 'antd-mobile';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.scss';

type User = {
    id: number;
    name: string | null;
    email: string | null;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    type: string;
    address: string;
    ref_address: string | null;
    image_path: string | null;
    is_vip: number;
    follower: number;
    following: number;
    can_create_report: number;
    invite_earned: number;
    telegram_id: number;
    telegram_username: string;
    nonce: string | null;
    gas_power: number;
    gas_rate_lvl: number;
    last_claim_gxp: string | null;
    gas_price: number;
    mint_gxp_per_second: number;
};

const LoginPage = () => {
    const navigate = useNavigate();

    const updateUser = async (address: string) => {
        const res = await axiosAuth.post<{
            user: User;
        }>('/user/info', { address });
        return res.data;
    };

    const mutation = useMutation({
        mutationKey: ['update-user'],
        mutationFn: updateUser,
        onSuccess: async () => {
            Toast.show({
                icon: 'success',
                content: 'Login success',
            });
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
            <Title text='Let&prime;s start' className={styles.pageTitle} />

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
                    label='Wallet address'
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
            </Form>
        </div>
    );
};

export default LoginPage;
