import { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import Pagination from "../Pagination/Pagination";
import styles from "./Table.module.css";

const Table = ({ currentPage, dataTitle, data, handleActions }) => {
  const { theme } = useContext(ThemeContext);
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
