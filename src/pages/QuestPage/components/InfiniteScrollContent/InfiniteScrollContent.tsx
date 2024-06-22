import { DotLoading } from 'antd-mobile';

type InfiniteScrollContentProps = {
    hasMore?: boolean;
};

const InfiniteScrollContent = ({ hasMore }: InfiniteScrollContentProps) => {
    return (
        hasMore && (
            <>
                <span>Loading</span>
                <DotLoading />
            </>
        )
    );
};

export default InfiniteScrollContent;
