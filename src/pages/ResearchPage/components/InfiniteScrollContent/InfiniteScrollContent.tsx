import { Flex } from '@/components/ui/Flex';
import { DotLoading } from 'antd-mobile';
import { Link } from 'react-router-dom';
import styles from './InfiniteScrollContent.module.scss';
import { TablerLayersLinked } from '@/components/icon';

type InfiniteScrollContentProps = {
    hasMore?: boolean;
};

const InfiniteScrollContent = ({ hasMore }: InfiniteScrollContentProps) => {
    return (
        <div className={styles.container}>
            {hasMore ? (
                <div className={styles.loading}>
                    <span>Loading</span>
                    <DotLoading className={styles.icon} />
                </div>
            ) : (
                <Flex justify='center' className={styles.other}>
                    <Link to='https://gemx.io/research' target='blank'>
                        <Flex justify='center' align='center'>
                            <div>Explore more</div>
                            <TablerLayersLinked className={styles.icon} />
                        </Flex>
                    </Link>
                </Flex>
            )}
        </div>
    );
};

export default InfiniteScrollContent;
