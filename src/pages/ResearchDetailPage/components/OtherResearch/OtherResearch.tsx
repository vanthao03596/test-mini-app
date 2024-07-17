import axiosAuth from '@/lib/axios';
import styles from './OtherResearch.module.scss';
import { Title } from '@/components/ui/Title';
import { Research } from '@/pages/ResearchPage/ResearchPage.types';
import { useQuery } from '@tanstack/react-query';
import { ResearchCard } from '@/components/ui/ResearchCard';

type OtherResearchProps = {
    currentId?: number;
};

type OtherResearchResponse = {
    researchs: Research[];
};

const OtherResearch = (props: OtherResearchProps) => {
    const { currentId } = props;

    const getOtherResearch = async () => {
        const res = await axiosAuth.get<OtherResearchResponse>(`/other-research?research_id=${currentId}`);
        return res.data;
    };

    const { data } = useQuery({
        queryKey: ['get-other-research'],
        queryFn: getOtherResearch,
    });

    return (
        <div className={styles.container}>
            <Title text='Other research' type='subtitle' />
            {data?.researchs.map((item) => (
                <ResearchCard key={item.id} {...item} />
            ))}
        </div>
    );
};

export default OtherResearch;
