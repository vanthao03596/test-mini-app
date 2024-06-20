import axiosAuth from '@/lib/axios';
import { UserInfo } from './components/UserInfo';
import styles from './HomePage.module.scss';
import { useQuery } from '@tanstack/react-query';
import { UserResponse } from './HomePage.types';
import { truncateEthAddress } from '@/utils/truncateEthAddress';

const HomePage = () => {
    // const getLastClaim = async () => {
    //     const res = await axiosAuth.get<LastClaimResponse>('/last-claim-reward');
    //     return res.data;
    // };

    const getUserInfo = async () => {
        const res = await axiosAuth.get<UserResponse>('/user/info');
        return res.data;
    };

    // const { data: lastClaimData } = useQuery({
    //     queryKey: ['last-claim'],
    //     queryFn: getLastClaim,
    // });

    const { data: accountData } = useQuery({
        queryKey: ['account'],
        queryFn: getUserInfo,
    });

    return (
        <div className={styles.container}>
            <UserInfo
                username={
                    accountData?.user.name ? accountData.user.name : truncateEthAddress(accountData?.user.address)
                }
                level={accountData?.user.gas_rate_lvl as number}
                image={
                    accountData?.user.image_path
                        ? accountData.user.image_path
                        : 'https://avatars.githubusercontent.com/u/84640980?v=4'
                }
                gasPrice={accountData?.user.gas_price as number}
            />
        </div>
    );
};

export default HomePage;
