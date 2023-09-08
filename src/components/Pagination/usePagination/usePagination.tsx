import { useMemo } from 'react';

interface Pagination {
    totalCount: number;
    pageSize: number;
    siblingCount: number;
    currentPage: number;
}

interface PaginationProps {
    typePagination: (string | number)[];
}

const range = (start: number, end: number) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
};

const UsePagination = ({ totalCount, pageSize, siblingCount = 1, currentPage }: Pagination): PaginationProps => {
    const paginationRange: PaginationProps | undefined = useMemo(() => {
        const totalPageCount = Math.ceil(totalCount / pageSize);

        const totalPageNumbers = siblingCount + 5;

        if (totalPageNumbers >= totalPageCount) {
            return { typePagination: range(1, totalPageCount) };
        }

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

        const firstPageIndex = 1;
        const lastPageIndex = totalPageCount;

        if (!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount = 3 + 2 * siblingCount;
            let leftRange = range(1, leftItemCount);

            return { typePagination: [...leftRange, totalPageCount] };
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {
            let rightItemCount = 3 + 2 * siblingCount;
            let rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);
            return { typePagination: [firstPageIndex, ...rightRange] };
        }

        if (shouldShowLeftDots && shouldShowRightDots) {
            let middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return { typePagination: [firstPageIndex, ...middleRange, lastPageIndex] };
        }
    }, [totalCount, pageSize, siblingCount, currentPage]);

    return paginationRange || { typePagination: [] };
};

export default UsePagination;
