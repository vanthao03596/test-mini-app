import usePagination from '@/hooks/usePagination';
import styles from './CustomPagination.module.scss';
import { TablerChevronLeft, TablerChevronRight } from '@/components/icon';
import clsx from 'clsx';

interface CustomPaginationProps {
    handlePageChange: (page: number) => void;
    pageNumber: number;
    totalPages: number;
    siblingCount?: number;
}

const CustomPagination = (props: CustomPaginationProps) => {
    const { handlePageChange, totalPages, pageNumber, siblingCount = 1 } = props;
    const pageFiller = '…';
    const listPagination = usePagination({ pageNumber, totalPages, siblingCount, pageFiller });

    const handleClickPrevious = () => {
        if (pageNumber > 1) {
            handlePageChange(pageNumber - 1);
        }
    };

    const handleClickNext = () => {
        if (pageNumber < totalPages) {
            handlePageChange(pageNumber + 1);
        }
    };

    return (
        <div className={styles.container}>
            {/* Back */}
            <div className={styles.arrow} onClick={handleClickPrevious}>
                <TablerChevronLeft />
            </div>

            {/* Page number */}
            <div className={styles.numberContainer}>
                {listPagination?.map((item, index) => (
                    <div
                        key={index}
                        className={clsx({
                            [styles.number]: true,
                            [styles.active]: Number(item) === pageNumber,
                        })}
                        onClick={() => handlePageChange(Number(item) || 1)}
                    >
                        {item}
                    </div>
                ))}
            </div>

            {/* Next */}
            <div className={styles.arrow} onClick={handleClickNext}>
                <TablerChevronRight />
            </div>
        </div>
    );
};

export default CustomPagination;
