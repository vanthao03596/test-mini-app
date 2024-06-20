import { Flex } from '@/components/ui/Flex';
import axiosAuth from '@/lib/axios';

import { TablerRocket } from '@/components/icon';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Card } from 'antd-mobile';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCountdown } from 'usehooks-ts';
import styles from './UserMining.module.scss';

type UserMiningProps = {
    gemInSecond: number;
    lastClaim: Date | null;
    address: string;
    gasPower: number;
};

const HOURS_TO_CLAIM = 6;
const HOURS_TO_CLAIM_TO_SECONDS = HOURS_TO_CLAIM * 60 * 60;
const ONE_DAY_TO_SECONDS = 24 * 60 * 60;

const secondsToHms = (d: number) => {
    d = Number(d);
    const h = Math.floor(d / 3600);
    const m = Math.floor((d % 3600) / 60);
    const s = Math.floor((d % 3600) % 60);
    return ('0' + h).slice(-2) + ':' + ('0' + m).slice(-2) + ':' + ('0' + s).slice(-2);
};

const UserMining = (props: UserMiningProps) => {
    const { address, gasPower, gemInSecond, lastClaim } = props;

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
            {/* Mine */}
            <div className={styles.mine}>
                {/* Card */}
                <Card className={styles.card}>
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
                </Card>

                {/* Button */}
                <Button
                    color='primary'
                    fill='solid'
                    className={styles.btn}
                    disabled={!acceptClaim}
                    onClick={handleMining}
                >
                    {lastClaim ? (acceptClaim ? 'Claim' : 'Mining') : 'Start mining'}
                </Button>
            </div>

            {/* Description */}
            <Flex className={styles.description}>
                {/* Left */}
                <Card className={clsx(styles.card, styles.left)}>
                    <div className={styles.amount}>{(gemInSecond * 3600).toFixed(2)} GXP</div>
                    <div className={styles.text}>Base mining speed</div>
                </Card>

                {/* Right */}
                <Card className={clsx(styles.card, styles.right)}>
                    <Flex className={styles.amount} align='center'>
                        {gasPower}
                        <Link to={'https://gemx.io/membership'} target='blank' className={styles.icon}>
                            <TablerRocket />
                        </Link>
                    </Flex>
                    <div className={styles.text}>Booster coefficient</div>
                </Card>
            </Flex>
        </div>
    );
};

export default UserMining;
