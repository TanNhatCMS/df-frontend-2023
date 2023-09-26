import { useState, useEffect, useContext} from "react";
import { useTranslation } from 'react-i18next';
import Pagination from "./Pagination";
import styles from "../../style/Table.module.css";
import { ThemeContext } from '../../view/context';

const Table = ({ currentPage, data, handleActions }) => {
  const { theme} = useContext(ThemeContext);
  const { t } = useTranslation();
  const dataLength = data.length;
  const limitPage = 5;

  const [dataPage, setDataPage] = useState([]);
  useEffect(() => {
    const startIndex = (currentPage - 1) * limitPage;
    const endIndex = Math.min(startIndex + limitPage, dataLength);
    const dataCurrentPage = data.slice(startIndex, endIndex).map((item, index) => ({
      serial: index + startIndex + 1,
      ...item,
    }));
    setDataPage(dataCurrentPage);
  }, [data, currentPage, dataLength]);

  const handleChangePage = (page) => {
    handleActions[0](page);
    localStorage.setItem("page", page.toString());
  };

  return (
    <div className={`${styles["data-table"]} ${styles[`theme-${theme}`]}`}>
      <table>
        <thead>
          <tr>
            <th key="0">{t("id")}</th>
            <th key="1">{t("name")}</th>
            <th key="2">{t("author")}</th>
            <th key="3">{t("topic")}</th>
            <th key="4">{t("action")}</th>
          </tr>
        </thead>
        <tbody>
          {dataPage.map((item, index) => {
            if (item) {
              return (
                <tr key={index}>
                  <td>{item.serial}</td>
                  <td>{item.name}</td>
                  <td>{item.author}</td>
                  <td>{item.topic}</td>
                  <td>
                    {item.id && (
                      <>
                        <button onClick={() => handleActions[1](item.id)}>
                        {t("edit")}
                        </button>
                        <button onClick={() => handleActions[2](item.id)}>
                        {t("delete")}
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            } else {
              return null;
            }
          })}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        total={dataLength}
        limit={limitPage}
        onPageChange={handleChangePage}
      />
    </div>
  );
};

export default Table;
