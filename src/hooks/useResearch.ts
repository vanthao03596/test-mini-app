import axiosAuth from '@/lib/axios';
import { ResearchResponse } from '@/pages/ResearchPage/ResearchPage.types';
import { useQuery } from '@tanstack/react-query';

const useResearch = () => {
    const getResearch = async () => {
        const res = await axiosAuth.get<ResearchResponse>('/latest-research?take=5');
        return res.data;
    };

    const researchQuery = useQuery({
        queryKey: ['get-latest-research'],
        queryFn: getResearch,
    });

    return researchQuery;
};

export default useResearch;
