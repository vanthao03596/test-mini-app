import { Flex } from '@/components/ui/Flex';
import { DotLoading } from 'antd-mobile';
import { Link } from 'react-router-dom';
import styles from './InfiniteScrollContent.module.scss';

type InfiniteScrollContentProps = {
    hasMore?: boolean;
};

const InfiniteScrollContent = ({ hasMore }: InfiniteScrollContentProps) => {
    return (
        <div className={styles.container}>
            {hasMore ? (
                <>
                    <span>Loading</span>
                    <DotLoading className={styles.icon} />
                </>
            ) : (
                <Flex justify='center' className={styles.other}>
                    <Link to='https://gemx.io/research' target='blank'>
                        <Flex justify='center'>Figure out more other research articles</Flex>
                    </Link>
                </Flex>
            )}
        </div>
    );
};

export default InfiniteScrollContent;
