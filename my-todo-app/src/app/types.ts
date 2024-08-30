export interface DataRow {
    id: symbol;
    name: string;
    date: number[]
  }
  export  interface ModalContent {
    cellValue: number | string | number[]; // Изменили тип на number | string
    rowValue: string;
    columnHeader: string;
  }