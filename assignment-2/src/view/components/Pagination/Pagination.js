import { useState } from "react";
import { getThemeMode } from '../../../utils/functions'
import PaginationItem from "./PaginationItem";
import styles from "./Pagination.module.css";

const Pagination = ({ currentPage, total, limit, onPageChange }) => {
  const { theme } = useState(getThemeMode);
  const pageCount = Math.ceil(total / limit);
  if (pageCount <= 1) {
    return null; // Ẩn pagination nếu chỉ có một trang
  }
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pageCount) {
      onPageChange(currentPage + 1);
    }
  };

  const handleFirstPage = () => {
    if (currentPage !== 1) {
      onPageChange(1);
    }
  };

  const handleLastPage = () => {
    if (currentPage !== pageCount) {
      onPageChange(pageCount);
    }
  };

  if (pageCount <= 5) {
    return (
      <div className={`${styles["pagination"]} ${styles[`theme-${theme}`]}`}>
        {currentPage > 1 && (
          <>
            <PaginationItem
              page={currentPage - 1}
              selected={false}
              handleClick={handlePrevPage}
            >
              &lt;
            </PaginationItem>
          </>
        )}
        {Array(pageCount)
          .fill(0)
          .map((_, index) => (
            <PaginationItem
              key={index + 1}
              page={index + 1}
              selected={index + 1 === currentPage}
              handleClick={onPageChange}
            >{index + 1}</PaginationItem>

          ))}
        {currentPage < pageCount && (
          <>
            <PaginationItem
              page={currentPage + 1}
              selected={false}
              handleClick={handleNextPage}
            >
              &gt;
            </PaginationItem>
          </>
        )}
      </div>
    );
  } else {
    return (
      <div className={`${styles["pagination"]} ${styles[`theme-${theme}`]}`}>
        {/* Pagination Item: First */}
        {currentPage > 1 && (
          <>
            <PaginationItem
              page={1}
              selected={1 === currentPage}
              handleClick={handleFirstPage}
            >
              &lt;&lt;
            </PaginationItem>
            <PaginationItem
              page={currentPage - 1}
              selected={false}
              handleClick={handlePrevPage}
            >
              &lt;
            </PaginationItem>
          </>
        )}
        <PaginationItem
          page={1}
          selected={1 === currentPage}
          handleClick={onPageChange}
        >1</PaginationItem>
        {!(currentPage <= 3) && "..."}

        {/* Pagination Item: Middle */}
        {currentPage <= 3 &&
          Array(3)
            .fill(0)
            .map((_, index) => (
              <PaginationItem
                key={index + 2}
                page={index + 2}
                selected={index + 2 === currentPage}
                handleClick={onPageChange}
              >{index + 2}</PaginationItem>
            ))}

        {pageCount > 6 && currentPage > 3 && currentPage <= pageCount - 3 && (
          <>
            <PaginationItem
              page={currentPage - 1}
              selected={false}
              handleClick={onPageChange}
            >{currentPage - 1}</PaginationItem>
            <PaginationItem
              page={currentPage}
              selected={true}
              handleClick={onPageChange}
            >{currentPage}</PaginationItem>
            <PaginationItem
              page={currentPage + 1}
              selected={false}
              handleClick={onPageChange}
            >{currentPage + 1}</PaginationItem>
          </>
        )}

        {currentPage > pageCount - 3 &&
          Array(3)
            .fill(0)
            .map((_, index) => (
              <PaginationItem
                key={pageCount + index - 3}
                page={pageCount + index - 3}
                selected={pageCount + index - 3 === currentPage}
                handleClick={onPageChange}
              >{pageCount + index - 3}</PaginationItem>
            ))}

        {/* Pagination Item: Last */}
        {!(currentPage > pageCount - 3) && "..."}
        <PaginationItem
          page={pageCount}
          selected={pageCount === currentPage}
          handleClick={onPageChange}
        >{pageCount}</PaginationItem>
        {currentPage < pageCount && (
          <>
            <PaginationItem
              page={currentPage + 1}
              selected={false}
              handleClick={handleNextPage}
            >
              &gt;
            </PaginationItem>
            <PaginationItem
              page={pageCount}
              selected={pageCount === currentPage}
              handleClick={handleLastPage}
            >
              &gt;&gt;
            </PaginationItem>
          </>
        )}
      </div>
    );
  }
};

export default Pagination;
