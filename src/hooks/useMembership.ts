import axiosAuth from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

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

const useMembership = () => {
    const getMembership = async () => {
        const res = await axiosAuth.get<MembershipResponse>('/my-membership');
        return res.data;
    };

    return useQuery({
        queryKey: ['get-membership'],
        queryFn: getMembership,
    });
};

export default useMembership;
