import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

export const DEFAULT_PAGE = 1;

const usePageSize = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [searchParams] = useSearchParams();

    const page = Number(searchParams.get('page')) > 0 ? Number(searchParams.get('page')) : DEFAULT_PAGE;

    const handleChangePageSize = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString());
        navigate(`${pathname}?${params.toString()}`);
    };

    return { page, handleChangePageSize };
};

export default usePageSize;
