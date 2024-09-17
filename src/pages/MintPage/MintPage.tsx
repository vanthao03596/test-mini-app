import useUser from '@/hooks/useUser';
import axiosAuth from '@/lib/axios';
import { truncateEthAddress } from '@/utils/truncateEthAddress';
import { useQuery } from '@tanstack/react-query';
import { UserInfo } from './components/UserInfo';
import { UserMining } from './components/UserMining';
import styles from './MintPage.module.scss';
import { LastClaimResponse } from './MintPage.types';
import { Flex } from '@/components/ui/Flex';
import GIFS from '@/assets/gif';

const MintPage = () => {
    const getLastClaim = async () => {
        const res = await axiosAuth.get<LastClaimResponse>('/last-claim-reward');
        return res.data;
    };

    const user = useUser();

    const { data: lastClaimData } = useQuery({
        queryKey: ['last-claim'],
        queryFn: getLastClaim,
    });

    return (
        <div className={styles.container}>
            {user && lastClaimData && (
                <>
                    {/* Info */}
                    <UserInfo
                        username={user.name || truncateEthAddress(user.address)}
                        level={user.gas_rate_lvl}
                        image={user.image_path || 'https://avatars.githubusercontent.com/u/84640980?v=4'}
                        gemInSecond={user.mint_gxp_per_second}
                        gxpEarn={user.gxp_earn}
                        nextLvlGxp={user.next_lvl_gxp}
                        totalRead={user.total_read}
                    />

                    {/* Gif */}
                    <Flex justify='center' className={styles.gif}>
                        <img src={GIFS.gemx} />
                    </Flex>

                    {/* Mining */}
                    <UserMining
                        gemInSecond={user.mint_gxp_per_second}
                        lastClaim={lastClaimData.last_claim}
                        address={user.address}
                        gasPower={user.gas_power}
                        level={user.gas_rate_lvl}
                        gasPrice={user.gas_price}
                    />
                </>
            )}
        </div>
    );
};

export default MintPage;
