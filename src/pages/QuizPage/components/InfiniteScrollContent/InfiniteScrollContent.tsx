import { DotLoading } from 'antd-mobile';
import styles from './InfiniteScrollContent.module.scss';

type InfiniteScrollContentProps = {
    hasMore?: boolean;
};

const InfiniteScrollContent = ({ hasMore }: InfiniteScrollContentProps) => {
    return (
        hasMore && (
            <div className={styles.loading}>
                <span>Loading</span>
                <DotLoading className={styles.icon} />
            </div>
        )
    );
};

export default InfiniteScrollContent;
