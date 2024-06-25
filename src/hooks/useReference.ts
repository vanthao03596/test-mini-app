import axiosAuth from '@/lib/axios';
import { User } from '@/types/public.types';
import { useQuery } from '@tanstack/react-query';

type RefResponse = {
    users: User[];
};

const useReference = () => {
    const getRef = async (level: 'f1' | 'f2') => {
        const res = await axiosAuth.get<RefResponse>(`/user/ref?lvl=${level}`);
        return res.data;
    };

    const { data: f1 } = useQuery({
        queryKey: ['get-f1'],
        queryFn: () => getRef('f1'),
    });

    const { data: f2 } = useQuery({
        queryKey: ['get-f2'],
        queryFn: () => getRef('f2'),
    });

    // Extract data
    const listF1 = f1?.users;
    const listF2 = f2?.users;

    return { listF1, listF2 };
};

export default useReference;
