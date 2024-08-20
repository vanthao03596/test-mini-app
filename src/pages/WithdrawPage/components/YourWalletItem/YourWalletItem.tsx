import IMAGES from '@/assets/images';
import { TablerChevronRight } from '@/components/icon';
import useWithdrawStatus from '@/hooks/useWithdrawStatus';
import axiosAuth from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Avatar, Button, Ellipsis, Form, Input, List, Popup, Toast } from 'antd-mobile';
import { AxiosError } from 'axios';
import { useState } from 'react';
import styles from './YourWalletItem.module.scss';

const YourWalletItem = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [form] = Form.useForm();
    const queryClient = useQueryClient();

    const { data: withdrawStatusData, isLoading: isWithdrawStatusLoading } = useWithdrawStatus();

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
            await queryClient.invalidateQueries({ queryKey: ['get-withdraw-status'] });
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
                        {/* Earn */}
                        <Form.Item className={styles.earn}>
                            Earned this month: {withdrawStatusData?.total_earn || 0} GXP
                        </Form.Item>

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

                        <Form.Item>
                            {/* Limit */}
                            {withdrawStatusData?.limit_reached && (
                                <div className={styles.limit}>You have reached the limit</div>
                            )}

                            {/* Tip */}
                            <div className={styles.tip}>
                                Earn 5.000 GXP to withdraw 20% USDT or 10.000 GXP to withdraw 30% USDT
                            </div>
                        </Form.Item>

                        {/* Submit */}
                        <Form.Item>
                            <Button
                                block
                                type='submit'
                                color='primary'
                                size='large'
                                disabled={isWithdrawStatusLoading || !withdrawStatusData?.can_withdraw}
                            >
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
