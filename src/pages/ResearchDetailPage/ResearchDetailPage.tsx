import axiosAuth from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import DOMPurify from 'dompurify';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from './ResearchDetailPage.module.scss';
import { CustomCard } from '@/components/ui/CustomCard';
import { Flex } from '@/components/ui/Flex';
import { Button, Skeleton, Space } from 'antd-mobile';
import { MaterialSymbolsKeyboardBackspaceRounded } from '@/components/icon';

type ResearchDetailResponse = {
    research: {
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
};

const ResearchDetailPage = () => {
    const navigate = useNavigate();
    const { researchId } = useParams();

    const getDetail = async () => {
        const res = await axiosAuth.get<ResearchDetailResponse>(`/researchs/${researchId}`);
        return res.data;
    };

    const { data, isLoading } = useQuery({
        queryKey: ['get-research-detail', researchId],
        queryFn: getDetail,
    });

    const detail = data?.research;

    if (isLoading) {
        return (
            <div className={styles.container}>
                <Skeleton.Title animated />
                <Skeleton.Paragraph lineCount={5} animated />
            </div>
        );
    }

    const handleBack = () => {
        navigate(-1);
    };

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

            {/* Must bought to view */}
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
        </div>
    );
};

export default ResearchDetailPage;
