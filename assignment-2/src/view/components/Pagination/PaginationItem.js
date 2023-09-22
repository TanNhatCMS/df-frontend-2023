import styles from "./Pagination.module.css";

const PaginationItem = ({ page, selected, handleClick, children }) => {
  return (
    <div
      className={`${styles["pagination-item"]} ${selected && styles["selected"]
        }`}
    >
      <button onClick={() => handleClick(page)}>{children}</button>
    </div>
  );
};

export default PaginationItem;
