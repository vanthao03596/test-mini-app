import axiosAuth from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { Image, Swiper } from 'antd-mobile';
import styles from './HomeBanner.module.scss';
import { Link } from 'react-router-dom';

type Banner = {
    id: number;
    img_path: string;
    link: string;
    position: number;
    created_at: Date;
    updated_at: Date;
};

type BannersResponse = {
    banners: Banner[];
};

const useGetBanners = () => {
    return useQuery({
        queryKey: ['get-banners'],
        queryFn: async (): Promise<BannersResponse> => {
            const res = await axiosAuth.get('/banners');
            return res.data;
        },
    });
};

const HomeBanner = () => {
    const { data } = useGetBanners();

    return (
        <div className={styles.container}>
            <Swiper>
                {data?.banners?.map((item) => (
                    <Swiper.Item key={item.id}>
                        <Link to={item.link} target='_blank'>
                            <Image src={item.img_path} height={160} fit='cover' />
                        </Link>
                    </Swiper.Item>
                ))}
            </Swiper>
        </div>
    );
};

export default HomeBanner;
