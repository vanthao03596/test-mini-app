import { TablerChevronRight } from '@/components/icon';
import { CustomList } from '@/components/ui/CustomList';
import { Title } from '@/components/ui/Title';
import axiosAuth from '@/lib/axios';
import { Research } from '@/pages/ResearchPage/ResearchPage.types';
import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';
import { useQuery } from '@tanstack/react-query';
import { Avatar, Ellipsis, List } from 'antd-mobile';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import styles from './OtherResearch.module.scss';

type OtherResearchProps = {
    currentId?: number;
};

type OtherResearchResponse = {
    researchs: Research[];
};

const OtherResearch = (props: OtherResearchProps) => {
    const { currentId } = props;

    const getOtherResearch = async () => {
        const res = await axiosAuth.get<OtherResearchResponse>(`/other-research?research_id=${currentId}`);
        return res.data;
    };

    const { data } = useQuery({
        queryKey: ['get-other-research', currentId],
        queryFn: getOtherResearch,
    });

    return (
        <div className={styles.container}>
            <Title text='Other research' type='subtitle' />
            <CustomList>
                {data?.researchs.map((item) => (
                    <Link to={`/research/${item.id}`} key={item.id}>
                        <List.Item
                            prefix={<Avatar src={item.img_path} />}
                            extra={<TablerChevronRight />}
                            description={<div className={styles.researchReward}>+{item.bonus} GPX</div>}
                            title={`${capitalizeFirstLetter(dayjs.utc(item.created_at).fromNow())} / ${item.user.name}`}
                        >
                            <Ellipsis content={item.title} />
                        </List.Item>
                    </Link>
                ))}
            </CustomList>
        </div>
    );
};

export default OtherResearch;
