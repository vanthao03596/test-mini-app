import IMAGES from '@/assets/images';
import { TablerChevronRight } from '@/components/icon';
import { Avatar, Button, Ellipsis, Form, Input, List, Popup, Toast } from 'antd-mobile';
import styles from './YourWalletItem.module.scss';
import { useState } from 'react';
import axiosAuth from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const YourWalletItem = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [form] = Form.useForm();

    const createWithdraw = async (amount: number) => {
        const res = await axiosAuth.post('/wallet/withdraw', {
            token: 'usdt',
            amount: amount,
        });

        return res.data;
    };

    const withdrawMutation = useMutation({
        mutationKey: ['create-withdraw-wallet'],
        mutationFn: createWithdraw,
        onSuccess: async () => {
            Toast.show({
                icon: 'success',
                content: <div className={styles.toastContent}>Withdraw created! Please wait up to 24 hours</div>,
            });
            form.resetFields();
            handleTogglePopup();
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

    const onFinish = (values: { amount: string }) => {
        withdrawMutation.mutate(Number(values.amount));
    };

    const handleTogglePopup = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={styles.container}>
            {/* Item */}
            <List.Item
                prefix={<Avatar src={IMAGES.cryptoWallet} />}
                description={'Withdraw to your wallet'}
                extra={<TablerChevronRight />}
                clickable={false}
                onClick={handleTogglePopup}
                className={styles.item}
            >
                <Ellipsis content='Your Metamask Wallet Address' />
            </List.Item>

            {/* Popup */}
            <Popup
                visible={isOpen}
                showCloseButton
                onClose={handleTogglePopup}
                bodyStyle={{
                    borderTopLeftRadius: '0.5rem',
                    borderTopRightRadius: '0.5rem',
                    borderTop: '1px solid var(--adm-color-primary)',
                }}
            >
                <div className={styles.popupContent}>
                    <Form layout='vertical' mode='card' form={form} onFinish={onFinish}>
                        {/* Amount */}
                        <Form.Item
                            label='Amount'
                            name='amount'
                            rules={[
                                {
                                    validator(_, value) {
                                        if (!value) {
                                            return Promise.reject(new Error('This field can not be empty'));
                                        } else if (!/^\d+$/.test(value)) {
                                            return Promise.reject(new Error('Only digit accepted'));
                                        } else {
                                            return Promise.resolve();
                                        }
                                    },
                                },
                            ]}
                        >
                            <Input placeholder='USDT' clearable />
                        </Form.Item>

                        {/* Submit */}
                        <Form.Item>
                            <Button block type='submit' color='primary' size='large'>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Popup>
        </div>
    );
};

export default YourWalletItem;
