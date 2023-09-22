import styles from "./Pagination.css";

const PaginationItem = ({ page, selected, handleClick }) => {
  return (
    <div
      className={`${styles["pagination-item"]} ${selected && styles["selected"]
        }`}
    >
      <button onClick={() => handleClick(page)}>{page}</button>
    </div>
  );
};

export default PaginationItem;
