import { useState, MouseEvent, useRef } from "react";
import Modal from "./components/modal"; 
import "./styles.css";

type DataRow = {
  name: string; 
  date1: string; 
  date2: string;
};

const data: DataRow[] = [
  { name: "Иван Иванов", date1: "2024-08-01", date2: "2024-08-02" },
  { name: "Петр Петров", date1: "2024-08-03", date2: "2024-08-04" },
];

export default function App() {
  const [isModalActive, setModalActive] = useState(false);
  const [modalContent, setModalContent] = useState({
    cellValue: "",
    rowValue: "",
    columnHeader: ""
  });
  const [modalPosition, setModalPosition] = useState<{ top: string; left: string } | null>(null);
  const [activeCell, setActiveCell] = useState<HTMLElement | null>(null);
  const tableRef = useRef<HTMLTableElement>(null);

  const handleModalOpen = (event: MouseEvent<HTMLTableCellElement>, cellValue: string, rowValue: string, columnHeader: string) => {
    const cell = event.currentTarget;
    const cellRect = cell.getBoundingClientRect();
    const tableRect = tableRef.current?.getBoundingClientRect() || { top: 0, left: 0 };
    
    
    const distanceFromTop = cellRect.bottom - tableRect.top;
    const distanceFromLeft = cellRect.left - tableRect.left;
    
    console.log(`Distance from cell to top of table: ${distanceFromTop}px`);
    console.log(`Distance from cell to left of table: ${distanceFromLeft}px`);
    
    
    setModalPosition({
      top: `${distanceFromTop - 600}px`, 
      left: `${distanceFromLeft-1200}px`,  
    });
   
    setActiveCell(cell);
    setModalContent({ cellValue, rowValue, columnHeader });
    setModalActive(true);
  };

  const handleModalClose = () => {
    setModalActive(false);
    setActiveCell(null);
  };

  return (
    <div className="App">
      <h1>Custom modal component</h1>
      <table ref={tableRef}>
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
                className={activeCell?.textContent === row.name ? "active-cell" : ""}
                onClick={(event) => handleModalOpen(event, row.name, row.name, "ФИО")}
              >
                {row.name}
              </td>
              <td
                className={activeCell?.textContent === row.date1 ? "active-cell" : ""}
                onClick={(event) => handleModalOpen(event, row.date1, row.name, "Дата 1")}
              >
                {row.date1}
              </td>
              <td
                className={activeCell?.textContent === row.date2 ? "active-cell" : ""}
                onClick={(event) => handleModalOpen(event, row.date2, row.name, "Дата 2")}
              >
                {row.date2}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalActive && modalPosition && (
        <Modal
          title="Cell Details"
          onClose={handleModalClose}
          style={{
            top: modalPosition.top,
            left: modalPosition.left
          }}
        >
          <p><strong>Значение ячейки:</strong> {modalContent.cellValue}</p>
          <p><strong>ФИО студента:</strong> {modalContent.rowValue}</p>
          <p><strong>Заголовок колонки:</strong> {modalContent.columnHeader}</p>
        </Modal>
      )}
    </div>
  );
}
