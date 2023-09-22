import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import PaginationItem from "./PaginationItem";
import styles from "./Pagination.module.css";

const Pagination = ({ currentPage, total, limit, onPageChange }) => {
  const { theme } = useContext(ThemeContext);
  const pageCount = Math.ceil(total / limit);

  if (pageCount <= 5) {
    return (
      <div className={`${styles["pagination"]} ${styles[`theme-${theme}`]}`}>
        {Array(pageCount)
          .fill(0)
          .map((_, index) => (
            <PaginationItem
              key={index + 1}
              page={index + 1}
              selected={index + 1 === currentPage}
              handleClick={onPageChange}
            />
          ))}
      </div>
    );
  } else {
    return (
      <div className={`${styles["pagination"]} ${styles[`theme-${theme}`]}`}>
        {/* Pagination Item: First */}
        <PaginationItem
          page={1}
          selected={1 === currentPage}
          handleClick={onPageChange}
        />
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
              />
            ))}

        {pageCount > 6 && currentPage > 3 && currentPage <= pageCount - 3 && (
          <>
            <PaginationItem
              page={currentPage - 1}
              selected={false}
              handleClick={onPageChange}
            />
            <PaginationItem
              page={currentPage}
              selected={true}
              handleClick={onPageChange}
            />
            <PaginationItem
              page={currentPage + 1}
              selected={false}
              handleClick={onPageChange}
            />
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
              />
            ))}

        {/* Pagination Item: Last */}
        {!(currentPage > pageCount - 3) && "..."}
        <PaginationItem
          page={pageCount}
          selected={pageCount === currentPage}
          handleClick={onPageChange}
        />
      </div>
    );
  }
};

export default Pagination;
