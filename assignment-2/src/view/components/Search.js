import styles from "../../style/Search.module.css";
import { useTranslation } from 'react-i18next';

const Search = ({ onChangeKeyword }) => {
  const { t } = useTranslation();
  return (
    <div className={`${styles["search"]}`}>
      <form>
        <input
          id="search__keyword"
          type="text"
          name="search__keyword"
          autoComplete="on"
          placeholder={t("searchbook")}
          onChange={(event) => onChangeKeyword(event.target.value)}
        ></input>
      </form>
    </div>
  );
};

export default Search;
