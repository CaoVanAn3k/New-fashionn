// import classNames from 'classnames/bind';
// import styles from './Pagination.module.scss';

// import React from 'react';
// import usePagination from '@mui/material/usePagination/usePagination';
// // import { usePagination, DOTS } from './usePagination/usePagination';

// const cx = classNames.bind(styles);

// interface PaginationProps {
//   onPageChange: (pageNumber: number) => void;
//   totalCount: number;
//   siblingCount?: number;
//   currentPage: number;
//   pageSize: number;
//   className?: string;
// }

// const Pagination: React.FC<PaginationProps> = ({
//   onPageChange,
//   totalCount,
//   siblingCount = 1,
//   currentPage,
//   pageSize,
//   className,
// }) => {
//   const paginationRange = usePagination({
//     page: currentPage,        // Sử dụng 'page' thay vì 'currentPage'
//     count: totalCount,
//     boundaryCount: siblingCount,
//     siblingCount: siblingCount,

//   });

//   if (currentPage === 0 || paginationRange.length < 2) {
//     return null;
//   }

//   const onNext = () => {
//     onPageChange(currentPage + 1);
//   };

//   const onPrevious = () => {
//     onPageChange(currentPage - 1);
//   };

//   let lastPage = paginationRange[paginationRange.length - 1];

//   return (
//     <ul className={cx('pagination-container', { [className!]: className })}>
//       {/* Left navigation arrow */}
//       <li
//         className={cx('pagination-item', {
//           disabled: currentPage === 1,
//         })}
//         onClick={onPrevious}
//       >
//         <div className="arrow left" />
//       </li>
//       {paginationRange.map((pageNumber, index) => {
//         // If the pageItem is a DOT, render the DOTS unicode character
//         if (pageNumber === DOTS) {
//           return (
//             <li className="pagination-item dots" key={index}>
//               &#8230;
//             </li>
//           );
//         }
//         // Render our Page Pills
//         return (
//           <li
//             className={cx('pagination-item', {
//               selected: pageNumber === currentPage,
//             })}
//             onClick={() => onPageChange(pageNumber)}
//             key={index}
//           >
//             {pageNumber}
//           </li>
//         );
//       })}
//       {/* Right Navigation arrow */}
//       <li
//         className={cx('pagination-item', {
//           disabled: currentPage === lastPage,
//         })}
//         onClick={onNext}
//       >
//         <div className="arrow right" />
//       </li>
//     </ul>
//   );
// };

// export default Pagination;

function Pagination() {
    return <div>caovanan</div>;
}

export default Pagination;
