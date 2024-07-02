import { Title } from '@/components/ui/Title';
import useResearch from '@/hooks/useResearch';
import styles from './ResearchBox.module.scss';
import { CustomList } from '@/components/ui/CustomList';
import { Link } from 'react-router-dom';
import { Avatar, Ellipsis, List } from 'antd-mobile';
import { TablerChevronRight } from '@/components/icon';
import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';
import dayjs from 'dayjs';

const ResearchBox = () => {
    const { data } = useResearch();

    return (
        <div className={styles.container}>
            {/* Title */}
            <Title text='Research' type='subtitle' />

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

            {/* Footer */}
            <div className={styles.more}>
                <Link to='/research'>View more research</Link>
            </div>
        </div>
    );
};

export default ResearchBox;
