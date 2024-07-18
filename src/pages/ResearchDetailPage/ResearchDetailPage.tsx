import { MaterialSymbolsKeyboardBackspaceRounded } from '@/components/icon';
import { CustomCard } from '@/components/ui/CustomCard';
import { Flex } from '@/components/ui/Flex';
import axiosAuth from '@/lib/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AutoCenter, Button, Skeleton, Space, Toast } from 'antd-mobile';
import { AxiosError } from 'axios';
import DOMPurify from 'dompurify';
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCountdown, useIntersectionObserver } from 'usehooks-ts';
import styles from './ResearchDetailPage.module.scss';
import { OtherResearch } from './components/OtherResearch';

type ResearchDetail = {
    content: string;
    content_short: string;
    created_at: Date;
    dislike_count: number;
    fee: number | null;
    id: number;
    img_path: string;
    is_bought: boolean;
    is_featured: number;
    is_fee: boolean;
    language: string;
    like_count: number;
    review_count: number;
    slug: string;
    status: string;
    title: string;
    updated_at: Date;
    user_id: number;
};

type ResearchDetailResponse = {
    research: ResearchDetail;
};

type ResearchReadResponse = {
    researchs: ResearchDetail[];
};

const COUNTDOWN_TIME = 3;

const ResearchDetailPage = () => {
    const navigate = useNavigate();
    const { researchId } = useParams();
    const { isIntersecting, ref } = useIntersectionObserver();
    const [count, { startCountdown, resetCountdown }] = useCountdown({
        countStart: COUNTDOWN_TIME,
    });
    const queryClient = useQueryClient();

    // Get research read
    const getResearchRead = async () => {
        const res = await axiosAuth.get<ResearchReadResponse>(`/user/research-read`);
        return res.data;
    };

    const { data: researchReadData, isLoading: isResearchReadLoading } = useQuery({
        queryKey: ['get-research-read'],
        queryFn: getResearchRead,
    });

    // Get detail research
    const getDetail = async () => {
        const res = await axiosAuth.get<ResearchDetailResponse>(`/researchs/${researchId}`);
        return res.data;
    };

    const { data, isLoading } = useQuery({
        queryKey: ['get-research-detail', researchId],
        queryFn: getDetail,
    });

    // Claim reward
    const claimReward = async () => {
        const res = await axiosAuth.post<ResearchDetailResponse>(`/researchs/${researchId}/claim`);
        return res.data;
    };

    const rewardMutation = useMutation({
        mutationKey: ['claim-reward-research'],
        mutationFn: claimReward,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['get-research-read'] });
            Toast.show({
                icon: 'success',
                content: 'Claim success',
            });
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

    const detail = data?.research;
    const hasRead = researchReadData?.researchs.some((item) => item.id === Number(researchId));

    const handleClaim = () => {
        rewardMutation.mutate();
    };

    const handleBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        if (isIntersecting) {
            startCountdown();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isIntersecting]);

    useEffect(() => {
        resetCountdown();
        queryClient.invalidateQueries({ queryKey: ['get-other-read', researchId] });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [researchId]);

    if (isLoading || isResearchReadLoading) {
        return (
            <div className={styles.container}>
                <Skeleton.Title animated />
                <Skeleton.Paragraph lineCount={5} animated />
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {/* Back */}
            <Space align='center' className={styles.back} onClick={handleBack}>
                <Flex align='center'>
                    <MaterialSymbolsKeyboardBackspaceRounded fontSize={24} />
                </Flex>
                <div>Back</div>
            </Space>

            {/* Can view */}
            {detail && (!detail.is_fee || (detail.is_fee && detail.is_bought)) && (
                <CustomCard>
                    {/* Title */}
                    <div className={styles.title}>{detail.title}</div>

                    {/* Main */}
                    <div
                        className={styles.content}
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(detail.content) }}
                    ></div>
                </CustomCard>
            )}

            {/* Must buy to view */}
            {detail && detail.is_fee && !detail.is_bought && (
                <CustomCard>
                    {/* Title */}
                    <div className={styles.title}>{detail.title}</div>

                    {/* Description */}
                    <div
                        className={styles.content}
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(detail.content_short) }}
                    ></div>

                    {/* Buy */}
                    <CustomCard className={styles.card}>
                        <Flex direction='column' justify='center' align='center'>
                            <div>Buy to read this report</div>
                            <div className={styles.description}>Unlock this research with POINT</div>
                            <Link to={`https://gemx.io/research/${detail.slug}`} target='blank'>
                                <Button color='primary' fill='solid'>
                                    Buy Now
                                </Button>
                            </Link>
                        </Flex>
                    </CustomCard>
                </CustomCard>
            )}

            {/* Claim reward */}

            <div ref={ref} className={styles.claim}>
                {!hasRead ? (
                    <Button
                        color='primary'
                        fill='solid'
                        block
                        disabled={count !== 0}
                        loading={rewardMutation.isPending}
                        onClick={handleClaim}
                    >
                        {count !== 0 ? `Claim reward in ${count}s` : 'Claim GXP'}
                    </Button>
                ) : (
                    <AutoCenter>You had claimed reward in this research</AutoCenter>
                )}
            </div>

            <OtherResearch currentId={data?.research.id} />
        </div>
    );
};

export default ResearchDetailPage;
