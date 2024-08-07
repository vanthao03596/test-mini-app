import { CustomCard } from '@/components/ui/CustomCard';
import useUser from '@/hooks/useUser';
import styles from './NetworkRef.module.scss';
import { useState } from 'react';
import { Button, Input, Toast } from 'antd-mobile';
import axiosAuth from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const NetworkRef = () => {
    const account = useUser();
    const [address, setAddress] = useState<string>('');

    const ref = account?.user.ref_address;

    const createRef = async () => {
        const res = await axiosAuth.post('/user/ref', {
            ref_id: address,
        });

        return res.data;
    };

    const queryClient = useQueryClient();

    const refMutation = useMutation({
        mutationKey: ['create-ref'],
        mutationFn: createRef,
        onSuccess: async () => {
            Toast.show({
                icon: 'success',
                content: 'Create ref success',
            });
            queryClient.invalidateQueries({ queryKey: ['get-user-info'] });
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

    const handleCreateRef = () => {
        refMutation.mutate();
    };

    if (ref) return;

    return (
        <CustomCard className={styles.card}>
            <div className={styles.wrapper}>
                <div className={styles.title}>Reference</div>

                <Input
                    placeholder='Your ref ID'
                    value={address}
                    onChange={(val) => {
                        setAddress(val);
                    }}
                />

                <Button color='primary' fill='solid' disabled={!address} block onClick={handleCreateRef}>
                    Submit
                </Button>
            </div>
        </CustomCard>
    );
};

export default NetworkRef;
