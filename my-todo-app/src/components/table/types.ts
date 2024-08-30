import type { MouseEvent } from "react";

export interface DataRow {
  id: symbol;
  name: string;
  date: number[];
}


export interface TableProps {
  data: DataRow[];
  activeCell: HTMLElement | null;
  handleCellClick: (
    event: MouseEvent<HTMLTableCellElement>,
    cellValue: number | string | number[],
    rowValue: string,
    columnHeader: string
  ) => void;
}
