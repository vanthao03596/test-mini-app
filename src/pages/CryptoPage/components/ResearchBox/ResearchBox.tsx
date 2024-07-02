import { TablerChevronRight } from '@/components/icon';
import { CustomList } from '@/components/ui/CustomList';
import { Flex } from '@/components/ui/Flex';
import useResearch from '@/hooks/useResearch';
import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';
import { Avatar, Ellipsis, List } from 'antd-mobile';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import styles from './ResearchBox.module.scss';

const ResearchBox = () => {
    const { data } = useResearch();

    return (
        <div className={styles.container}>
            {/* Title */}
            <Flex justify='space-between' className={styles.title}>
                <div className={styles.text}>Research</div>
                <div className={styles.action}>
                    <Link to='/research'>View more</Link>
                </div>
            </Flex>

            {/* List */}
            <CustomList>
                {data?.data.map((item) => (
                    <Link to={`/research/${item.id}`} key={item.id}>
                        <List.Item
                            prefix={<Avatar src={item.img_path} />}
                            extra={<TablerChevronRight />}
                            description={capitalizeFirstLetter(dayjs.utc(item.created_at).fromNow())}
                        >
                            <Ellipsis content={item.title} />
                        </List.Item>
                    </Link>
                ))}
            </CustomList>
        </div>
    );
};

export default ResearchBox;
