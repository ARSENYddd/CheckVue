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
        <th>Дата 3</th>
        <th>Дата 4</th>
      </tr>
    </thead>
    <tbody>
      {data.map((row) => (
        <tr key={String(row.id)}> {/* Используем row.id для уникального ключа */}
          <td
            className={activeCell?.textContent === row.name ? styles.activeCell : ""}
            onClick={(event) => handleCellClick(event, row.name, row.name, "ФИО")}
          >
            {row.name}
          </td>
          
          <td
            className={activeCell?.textContent === String(row.date[0]) ? styles.activeCell : ""}
            onClick={(event) => handleCellClick(event, row.date, row.name, "Дата 1")}
          >
            {row.date[0]}
          </td>
          <td
            className={activeCell?.textContent === String(row.date[1]) ? styles.activeCell : ""}
            onClick={(event) => handleCellClick(event, row.date, row.name, "Дата 2")}
          >
            {row.date[1]}
          </td>
          <td
            className={activeCell?.textContent === String(row.date[2])? styles.activeCell : ""}
            onClick={(event) => handleCellClick(event, row.date, row.name, "Дата 3")}
          >
            {row.date[2]}
          </td>
          <td
            className={activeCell?.textContent === String(row.date[3]) ? styles.activeCell : ""}
            onClick={(event) => handleCellClick(event, row.date, row.name, "Дата 4")}
          >
            {row.date[3]}
          </td>
          
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table;
