import { useState, useEffect } from 'react';

interface UsePaginationProps {
    pageNumber: number;
    totalPages: number;
    siblingCount: number;
    pageFiller: string;
}

const usePagination = (props: UsePaginationProps) => {
    const { pageNumber, totalPages, siblingCount, pageFiller } = props;
    const [listPagination, setListPagination] = useState<string[] | null>(null);

    const getList = (pageNumber: number, totalPages: number, siblingCount: number, pageFiller: string) => {
        let pagination_str = '';

        // add first page if current page is not too close
        if (pageNumber - siblingCount > 1) {
            pagination_str += '1 ';
        }
        if (pageNumber - siblingCount > 2) {
            pagination_str += pageFiller + ' ';
        }

        // get siblingCount before
        for (
            // is current page to close to first page?
            let ii = 0 < pageNumber - siblingCount ? pageNumber - siblingCount : 1;
            ii < pageNumber;
            ii++
        ) {
            pagination_str += ii + ' ';
        }

        // get siblingCount after
        for (
            let ii = pageNumber;
            // is end of increment greater than or equal to the total number of pages?
            ii <= (totalPages >= pageNumber + siblingCount ? pageNumber + siblingCount : totalPages);
            ii++
        ) {
            pagination_str += ii + ' ';
        }

        // add last page if current page is not too close
        if (pageNumber + siblingCount < totalPages - 1) {
            pagination_str += pageFiller + ' ';
        }
        if (pageNumber + siblingCount < totalPages) {
            pagination_str += totalPages;
        }

        return pagination_str;
    };

    useEffect(() => {
        setListPagination(
            getList(pageNumber, totalPages, siblingCount, pageFiller)
                .split(' ')
                .filter((item) => item)
        );
    }, [pageNumber, totalPages, siblingCount, pageFiller]);

    return listPagination;
};

export default usePagination;
