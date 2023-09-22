import styles from "./Search.module.css";

const Search = ({ onChangeKeyword }) => {
  return (
    <div className={`${styles["search"]}`}>
      <form>
        <input
          id="search__keyword"
          type="text"
          name="search__keyword"
          autoComplete="on"
          placeholder="Search book ..."
          onChange={(event) => onChangeKeyword(event.target.value)}
        ></input>
      </form>
    </div>
  );
};

export default Search;
