import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const range = (start, end) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const usePagination = (currentPage) => {
  const totalCount = useSelector((state) => state.mainState.dataLength);

  const pgNoSiblings = 1;
  const entryPerPage = 20;

  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / entryPerPage);
    if (pgNoSiblings + 5 >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - pgNoSiblings, 1);
    const rightSiblingIndex = Math.min(
      currentPage + pgNoSiblings,
      totalPageCount
    );

    if (!(leftSiblingIndex > 1) && rightSiblingIndex < totalPageCount - 1) {
      let leftRange = range(1, 5);
      return [...leftRange, '...', totalPageCount];
    }

    if (leftSiblingIndex > 1 && !(rightSiblingIndex < totalPageCount - 1)) {
      let rightRange = range(totalPageCount - 4, totalPageCount);
      return [1, '...', ...rightRange];
    }

    if (leftSiblingIndex > 1 && rightSiblingIndex < totalPageCount - 1) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [1, '...', ...middleRange, '...', totalPageCount];
    }
  }, [totalCount, entryPerPage, pgNoSiblings, currentPage]);

  return paginationRange;
};
