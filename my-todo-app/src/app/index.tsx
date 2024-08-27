import React, { useRef } from "react";
import Modal from "../components/modal";
import Table from "../components/table";
import { useCellSelection } from "./hooks";
import { DataRow } from "./types";
import styles from "./index.module.css";

const data: DataRow[] = [
  { id: Symbol('id1'), name: 'Иван Иванов', date1: '2024-08-01', date2: '2024-08-02' },
  { id: Symbol('id2'), name: 'Петр Петров', date1: '2024-08-03', date2: '2024-08-04' },
];
const App: React.FC = () => {
  const tableRef = useRef<HTMLTableElement>(null);
  const {
    isModalActive,
    activeCell,
    modalContent,
    modalPosition,
    handleCellClick,
    setModalActive,
  } = useCellSelection(tableRef);

  const handleModalClose = () => {
    console.log("handleModalClose triggered");
    setModalActive(false);
    
  };

  return (
    <div className={styles.app}>
      <h1>Custom modal component</h1>
      <Table data={data} activeCell={activeCell} handleCellClick={handleCellClick} />
      {isModalActive && modalPosition && (
        <Modal
          title="Cell Details"
          onClose={handleModalClose}
          style={{
            top: modalPosition.top,
            left: modalPosition.left,
          }}
        >
          <p>
            <strong>Значение ячейки:</strong> {modalContent.cellValue}
          </p>
          <p>
            <strong>ФИО студента:</strong> {modalContent.rowValue}
          </p>
          <p>
            <strong>Заголовок колонки:</strong> {modalContent.columnHeader}
          </p>
        </Modal>
      )}
    </div>
  );
};

export default App;
