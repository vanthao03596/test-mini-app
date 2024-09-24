import IMAGES from '@/assets/images';
import { TablerCheck, TablerChevronRight } from '@/components/icon';
import { CustomList } from '@/components/ui/CustomList';
import { Flex } from '@/components/ui/Flex';
import { Title } from '@/components/ui/Title';
import axiosAuth from '@/lib/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Avatar, List, Modal, Space, Toast } from 'antd-mobile';
import { isAxiosError } from 'axios';
import { Fragment } from 'react/jsx-runtime';
import styles from './BoosterPlusPage.module.scss';

type PackageType = 'Base' | 'Silver';

type Package = {
    key: PackageType;
    name: string;
    price: number;
    unit: string;
    icon: string;
    detail: {
        boost: number;
        referrals: {
            level: number;
            commission: number;
        }[];
    };
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
        detail: {
            boost: 300,
            referrals: [
                {
                    level: 1,
                    commission: 1,
                },
                {
                    level: 2,
                    commission: 0.5,
                },
            ],
        },
    },
    {
        key: 'Silver',
        name: 'Silver',
        price: 30,
        unit: 'USDC',
        icon: IMAGES.medal.silver,
        detail: {
            boost: 3000,
            referrals: [
                {
                    level: 1,
                    commission: 10,
                },
                {
                    level: 2,
                    commission: 4,
                },
            ],
        },
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
            setTimeout(() => {
                queryClient.invalidateQueries({ queryKey: ['get-membership'] });
                queryClient.invalidateQueries({ queryKey: ['get-user-info'] });
            }, 2000);
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
        if (!packageMutation.isPending) {
            packageMutation.mutate(type);
        }
    };

    if (!membershipData) return;

    return (
        <div className={styles.container}>
            <Title text='Packages' />

            <CustomList>
                {packages.map((item) => (
                    <Fragment key={item.key}>
                        {/* Info */}
                        <List.Item
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
                                                            <span className={styles.colorPrimary}>{item.name}</span>{' '}
                                                            package for{' '}
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

                        {/* Detail */}
                        <Flex direction='column' className={styles.detail}>
                            {/* Boost */}
                            <Space align='start'>
                                <Flex align='center' justify='center'>
                                    <TablerCheck />
                                </Flex>
                                <div>
                                    Increase your boost by{' '}
                                    <span className={styles.colorPrimary}>{item.detail.boost}%</span>
                                </div>
                            </Space>

                            {/* Referral */}
                            <Space align='start'>
                                <Flex align='center' justify='center'>
                                    <TablerCheck />
                                </Flex>
                                <div>
                                    <div>Referral commissions</div>
                                    {item.detail.referrals.map((i, index) => (
                                        <div key={index}>
                                            Level {i.level}:{' '}
                                            <span className={styles.colorPrimary}>${i.commission}</span>
                                        </div>
                                    ))}
                                </div>
                            </Space>
                        </Flex>
                    </Fragment>
                ))}
            </CustomList>
        </div>
    );
};

export default BoosterPlusPage;
