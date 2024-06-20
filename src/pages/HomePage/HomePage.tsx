import axiosAuth from '@/lib/axios';
import { truncateEthAddress } from '@/utils/truncateEthAddress';
import { useQuery } from '@tanstack/react-query';
import { UserInfo } from './components/UserInfo';
import { UserMining } from './components/UserMining';
import styles from './HomePage.module.scss';
import { LastClaimResponse, UserResponse } from './HomePage.types';

const HomePage = () => {
    const getLastClaim = async () => {
        const res = await axiosAuth.get<LastClaimResponse>('/last-claim-reward');
        return res.data;
    };

    const getUserInfo = async () => {
        const res = await axiosAuth.get<UserResponse>('/user/info');
        return res.data;
    };

    const { data: lastClaimData } = useQuery({
        queryKey: ['last-claim'],
        queryFn: getLastClaim,
    });

    const { data: accountData } = useQuery({
        queryKey: ['account'],
        queryFn: getUserInfo,
    });

    return (
        <div className={styles.container}>
            {accountData && lastClaimData && (
                <>
                    {/* Info */}
                    <UserInfo
                        username={accountData.user.name || truncateEthAddress(accountData.user.address)}
                        level={accountData.user.gas_rate_lvl}
                        image={accountData.user.image_path || 'https://avatars.githubusercontent.com/u/84640980?v=4'}
                        gasPrice={accountData.user.gas_price}
                    />

                    {/* Mining */}
                    <UserMining
                        gemInSecond={accountData.user.mint_gxp_per_second}
                        lastClaim={lastClaimData.last_claim}
                        address={accountData.user.address}
                        gasPower={accountData.user.gas_power}
                    />
                </>
            )}
        </div>
    );
};

export default HomePage;
