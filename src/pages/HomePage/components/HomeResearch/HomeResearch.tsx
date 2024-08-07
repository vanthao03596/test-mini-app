import { TablerChevronRight } from '@/components/icon';
import { CustomList } from '@/components/ui/CustomList';
import useResearch from '@/hooks/useResearch';
import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';
import { Avatar, Ellipsis, List } from 'antd-mobile';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import styles from './HomeResearch.module.scss';

const HomeResearch = () => {
    const { data: researchData } = useResearch();

    return (
        <div className={styles.container}>
            <CustomList>
                {researchData?.data.map((item) => (
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

export default HomeResearch;
