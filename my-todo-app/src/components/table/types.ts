import type { MouseEvent } from "react";

export interface DataRow {
  id: symbol;
  name: string;
  date1: string;
  date2: string;
}

export interface TableProps {
  data: DataRow[];
  activeCell: HTMLElement | null;
  handleCellClick: (
    event: MouseEvent<HTMLTableCellElement>,
    cellValue: string,
    rowValue: string,
    columnHeader: string
  ) => void;
}
