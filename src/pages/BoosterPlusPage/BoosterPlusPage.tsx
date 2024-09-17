import IMAGES from '@/assets/images';
import { TablerChevronRight } from '@/components/icon';
import { CustomList } from '@/components/ui/CustomList';
import { Flex } from '@/components/ui/Flex';
import { Title } from '@/components/ui/Title';
import axiosAuth from '@/lib/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Avatar, List, Modal, Space, Toast } from 'antd-mobile';
import { isAxiosError } from 'axios';
import styles from './BoosterPlusPage.module.scss';

type PackageType = 'Base' | 'Silver';

type Package = {
    key: PackageType;
    name: string;
    price: number;
    unit: string;
    icon: string;
};

type Membership = {
    id: number;
    price: number;
    buyer: string;
    package: string;
    tx_hash: string | null;
    user_id: number;
    created_at: Date;
};

type MembershipResponse = {
    memberships: Membership[];
};

const packages: Package[] = [
    {
        key: 'Base',
        name: 'Base',
        price: 5,
        unit: 'USDC',
        icon: IMAGES.medal.bronze,
    },
    {
        key: 'Silver',
        name: 'Silver',
        price: 30,
        unit: 'USDC',
        icon: IMAGES.medal.silver,
    },
];

const BoosterPlusPage = () => {
    const purchasePackage = async (type: PackageType) => {
        const res = await axiosAuth.post('/buy-membership', {
            package: type,
        });
        return res.data;
    };

    const queryClient = useQueryClient();

    const getMembership = async () => {
        const res = await axiosAuth.get<MembershipResponse>('/my-membership');
        return res.data;
    };

    const { data: membershipData } = useQuery({
        queryKey: ['get-membership'],
        queryFn: getMembership,
    });

    const packageMutation = useMutation({
        mutationKey: ['purchase-package'],
        mutationFn: purchasePackage,
        onSuccess: () => {
            Toast.show({
                icon: 'success',
                content: 'Transaction Processing',
            });
            queryClient.invalidateQueries({ queryKey: ['get-membership'] });
            queryClient.invalidateQueries({ queryKey: ['get-user-info'] });
        },
        onError: (error) => {
            if (isAxiosError(error)) {
                Toast.show({
                    icon: 'fail',
                    content: error.response?.data.message,
                });
            }
        },
    });

    const handlePurchase = (type: PackageType) => {
        packageMutation.mutate(type);
    };

    if (!membershipData) return;

    return (
        <div className={styles.container}>
            <Title text='Packages' />

            <CustomList>
                {packages.map((item) => (
                    <List.Item
                        key={item.key}
                        prefix={<Avatar src={item.icon} />}
                        description={`${item.price} ${item.unit}`}
                        extra={
                            <Space align='center'>
                                {!membershipData.memberships.some((i) => i.package === item.key) ? (
                                    <div
                                        className={styles.action}
                                        onClick={() => {
                                            Modal.confirm({
                                                title: 'PURCHASE',
                                                content: (
                                                    <div className={styles.modalContent}>
                                                        You're about to buy the{' '}
                                                        <span className={styles.colorPrimary}>{item.name}</span> package
                                                        for{' '}
                                                        <span className={styles.colorPrimary}>
                                                            {item.price} {item.unit}
                                                        </span>
                                                    </div>
                                                ),
                                                confirmText: 'Sure',
                                                cancelText: 'Cancel',
                                                onConfirm: () => handlePurchase(item.key),
                                            });
                                        }}
                                    >
                                        Update
                                    </div>
                                ) : (
                                    'Purchased'
                                )}

                                <Flex align='center'>
                                    <TablerChevronRight />
                                </Flex>
                            </Space>
                        }
                    >
                        {item.name}
                    </List.Item>
                ))}
            </CustomList>
        </div>
    );
};

export default BoosterPlusPage;
