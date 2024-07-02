import { CustomCard } from '@/components/ui/CustomCard';
import { Flex } from '@/components/ui/Flex';
import axiosAuth from '@/lib/axios';
import secondsToHms from '@/utils/secondsToHms';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from 'antd-mobile';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useCountdown } from 'usehooks-ts';
import { MiningBooster } from '../MiningBooster';
import MiningSpeed from '../MiningSpeed/MiningSpeed';
import styles from './UserMining.module.scss';

type UserMiningProps = {
    gemInSecond: number;
    lastClaim: Date | null;
    address: string;
    gasPower: number;
    level: number;
};

const HOURS_TO_CLAIM = 6;
const HOURS_TO_CLAIM_TO_SECONDS = HOURS_TO_CLAIM * 60 * 60;
const ONE_DAY_TO_SECONDS = 24 * 60 * 60;

const UserMining = (props: UserMiningProps) => {
    const { address, gasPower, gemInSecond, lastClaim, level } = props;

    const diffTime = dayjs.utc().diff(dayjs.utc(lastClaim), 'seconds');
    const isCountDown = diffTime < HOURS_TO_CLAIM_TO_SECONDS;
    const remainingTime = isCountDown
        ? dayjs.utc(lastClaim).add(HOURS_TO_CLAIM, 'hours').diff(dayjs.utc(), 'seconds')
        : 0;
    const rewardAmount = diffTime < ONE_DAY_TO_SECONDS ? gemInSecond * diffTime : gemInSecond * ONE_DAY_TO_SECONDS;
    const acceptClaim = !isCountDown;

    const [count, { startCountdown, stopCountdown, resetCountdown }] = useCountdown({
        countStart: remainingTime,
    });

    const queryClient = useQueryClient();

    const createLastClaim = async () => {
        const res = await axiosAuth.post('/claim-reward', address);
        return res.data;
    };

    const lastClaimMutation = useMutation({
        mutationFn: createLastClaim,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['last-claim'] });
        },
        onError: (e: Error) => {
            console.log(e);
        },
    });

    const handleMining = () => {
        lastClaimMutation.mutate();
    };

    useEffect(() => {
        if (diffTime < ONE_DAY_TO_SECONDS) {
            resetCountdown();
            startCountdown();
        } else stopCountdown();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [diffTime]);

    return (
        <div className={styles.container}>
            {/* Image */}
            <Flex justify='center' className={styles.image}>
                <img src='/gemx-crypto.png' />
            </Flex>

            {/* Card */}
            <div className={styles.mine}>
                <CustomCard className={styles.card}>
                    <Flex align='center' direction='column'>
                        {/* Amount */}
                        <div className={styles.amount}>{!lastClaim ? 0 : rewardAmount.toFixed(4)}</div>
                        {/* Time */}
                        <div className={styles.time}>{secondsToHms(count)}</div>
                        {/* Description */}
                        <div className={styles.text}>
                            {isCountDown ? 'Time until the next rewards' : 'Reward is ready'}
                        </div>
                    </Flex>

                    {/* Button */}
                    <Flex justify='center'>
                        <Button
                            color='primary'
                            fill='solid'
                            className={styles.btn}
                            disabled={!acceptClaim}
                            onClick={handleMining}
                        >
                            {lastClaim ? (acceptClaim ? 'Claim' : 'Mining') : 'Start mining'}
                        </Button>
                    </Flex>
                </CustomCard>
            </div>

            {/* Description */}
            <Flex className={styles.description}>
                <MiningSpeed gemInSecond={gemInSecond} level={level} />
                <MiningBooster gasPower={gasPower} />
            </Flex>
        </div>
    );
};

export default UserMining;
