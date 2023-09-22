import { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import Pagination from "../Pagination/Pagination";
import styles from "./Table.module.css";

const Table = ({ currentPage, dataTitle, data, handleActions }) => {
  const { theme } = useContext(ThemeContext);
  const dataLength = data.length;
  const limitPage = 5;

  const [dataPage, setDataPage] = useState([]);
  useEffect(() => {
    let dataCurrentPage = [];
    for (let i = 0; i < 5; i++) {
      dataCurrentPage[i] = {
        serial: i + 1 + (currentPage - 1) * limitPage,
        ...data[i + (currentPage - 1) * limitPage],
      };
    }
    setDataPage(dataCurrentPage);
  }, [data, currentPage]);

  const handleChangePage = (page) => {
    handleActions[0](page);
    localStorage.setItem("page-store", page.toString());
  };

  return (
    <div className={`${styles["data-table"]} ${styles[`theme-${theme}`]}`}>
      <table>
        <thead>
          <tr>
            {dataTitle.map((title, index) => (
              <th key={index}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataPage.map((item, index) => {
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
                        Edit
                      </button>
                      <button onClick={() => handleActions[2](item.id)}>
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            );
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
