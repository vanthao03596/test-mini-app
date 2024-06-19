import usePagination from '@/hooks/usePagination';
import styles from './CustomPagination.module.scss';

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
            {/* Arrow left*/}
            <div className={styles.arrow} onClick={handleClickPrevious}>
                Back
            </div>

            {/* Page number */}
            <div className={styles.numberContainer}>
                {listPagination?.map((item, index) => {
                    if (Number(item) === pageNumber)
                        return (
                            <div key={index} onClick={() => handlePageChange(Number(item))}>
                                {item}
                            </div>
                        );

                    return (
                        <div onClick={() => handlePageChange(Number(item))} className={styles.center}>
                            {item}
                        </div>
                    );
                })}
            </div>

            {/* Arrow right*/}
            <div className={styles.arrow} onClick={handleClickNext}>
                Next
            </div>
        </div>
    );
};

export default CustomPagination;
