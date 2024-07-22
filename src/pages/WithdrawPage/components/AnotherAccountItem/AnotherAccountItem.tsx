import IMAGES from '@/assets/images';
import { TablerChevronRight } from '@/components/icon';
import { Avatar, Button, Ellipsis, Form, Input, List, Popup, Toast } from 'antd-mobile';
import { useState } from 'react';
import styles from './AnotherAccountItem.module.scss';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import axiosAuth from '@/lib/axios';

type FormProps = { amount: number; address: string };

const AnotherAccountItem = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [form] = Form.useForm();

    const createWithdraw = async (values: FormProps) => {
        const res = await axiosAuth.post('/wallet/withdraw', {
            token: 'usdt',
            amount: values.amount,
            address: values.address,
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

    const onFinish = (values: FormProps) => {
        withdrawMutation.mutate({
            amount: values.amount,
            address: values.address,
        });
    };

    const handleTogglePopup = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={styles.container}>
            <List.Item
                prefix={<Avatar src={IMAGES.money} />}
                description={'Withdraw to another account'}
                extra={<TablerChevronRight />}
                clickable={false}
                onClick={handleTogglePopup}
                className={styles.item}
            >
                <Ellipsis content='Another account' />
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

                        {/* Address */}
                        <Form.Item
                            label='ETH Address'
                            name='address'
                            rules={[
                                {
                                    validator(_, value) {
                                        if (!value) {
                                            return Promise.reject(new Error('This field can not be empty'));
                                        } else if (!String(value).startsWith('0x')) {
                                            return Promise.reject(new Error('Wallet address must start with 0x'));
                                        } else {
                                            return Promise.resolve();
                                        }
                                    },
                                },
                            ]}
                        >
                            <Input placeholder='0x . . .' clearable />
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

export default AnotherAccountItem;
