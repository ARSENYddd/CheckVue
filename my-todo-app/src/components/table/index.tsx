import React from "react";
import type { TableProps } from "./types";
import styles from "./index.module.css";

const Table: React.FC<TableProps> = ({ data, activeCell, handleCellClick }) => (
  <table className={styles.table}>
    <thead>
      <tr>
        <th>ФИО</th>
        <th>Дата 1</th>
        <th>Дата 2</th>
      </tr>
    </thead>
    <tbody>
      {data.map((row, rowIndex) => (
        <tr key={rowIndex}>
          <td
            className={activeCell?.textContent === row.name ? styles.activeCell : ""}
            onClick={(event) => handleCellClick(event, row.name, row.name, "ФИО")}
          >
            {row.name}
          </td>
          <td
            className={activeCell?.textContent === row.date1 ? styles.activeCell : ""}
            onClick={(event) => handleCellClick(event, row.date1, row.name, "Дата 1")}
          >
            {row.date1}
          </td>
          <td
            className={activeCell?.textContent === row.date2 ? styles.activeCell : ""}
            onClick={(event) => handleCellClick(event, row.date2, row.name, "Дата 2")}
          >
            {row.date2}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table;
