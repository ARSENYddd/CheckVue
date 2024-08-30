import React, { useRef } from "react";
import Modal from "../components/modal";
import Table from "../components/table";
import { useCellSelection } from "./hooks";
import { DataRow } from "./types";
import styles from "./index.module.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const data: DataRow[] = [
  { id: Symbol('id1'), name: 'Анна Сергеева', date: [82,47,68,15]},
  { id: Symbol('id2'), name: 'Василий Петров', date: [92, 59,43,71] },
  { id: Symbol('id3'), name: 'Мария Смирнова', date: [17,85,33,63] },
  { id: Symbol('id4'), name: 'Дмитрий Кузнецов', date: [17,85,33,63]},
  { id: Symbol('id5'), name: 'Елена Иванова', date: [17,83,53,43]},
  { id: Symbol('id6'), name: 'Алексей Федоров', date: [14,35,13,63] },
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
    setModalActive(false);
  };

  // Преобразование данных для графика
  const chartData = (modalContent.cellValue as number[]).map((value, index) => ({
    date: `Дата ${index + 1}`,
    value,
  }));

  return (
    <div className={styles.app}>
      <h1>Custom modal component</h1>
      <Table data={data} activeCell={activeCell} handleCellClick={handleCellClick} />
      {isModalActive && modalPosition && modalContent && (
        <Modal
          title="Cell Details"
          onClose={handleModalClose}
          style={{
            top: modalPosition.top,
            left: modalPosition.left,
          }}
        >
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[10, 100]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" name="Value" />
            </LineChart>
          </ResponsiveContainer>
        </Modal>
      )}
    </div>
  );
};

export default App;
