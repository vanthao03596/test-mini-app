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

    const account = useUser();

    const { data: lastClaimData } = useQuery({
        queryKey: ['last-claim'],
        queryFn: getLastClaim,
    });

    return (
        <div className={styles.container}>
            {account && lastClaimData && (
                <>
                    {/* Info */}
                    <UserInfo
                        username={account.user.name || truncateEthAddress(account.user.address)}
                        level={account.user.gas_rate_lvl}
                        image={account.user.image_path || 'https://avatars.githubusercontent.com/u/84640980?v=4'}
                        gasPrice={account.user.gas_price}
                    />

                    {/* Gif */}
                    <Flex justify='center' className={styles.gif}>
                        <img src={GIFS.gemx} />
                    </Flex>

                    {/* Mining */}
                    <UserMining
                        gemInSecond={account.user.mint_gxp_per_second}
                        lastClaim={lastClaimData.last_claim}
                        address={account.user.address}
                        gasPower={account.user.gas_power}
                        level={account.user.gas_rate_lvl}
                    />
                </>
            )}
        </div>
    );
};

export default MintPage;
