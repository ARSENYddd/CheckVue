import { useState, useEffect, useCallback, RefObject, MouseEvent } from "react";
import { DataRow, ModalContent } from "./types";

export const useCellSelection = (tableRef: RefObject<HTMLTableElement>) => {
  const [isModalActive, setModalActive] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContent>
  ({
    cellValue: [],
    rowValue: "",
    columnHeader: "",
    
  });
  const [modalPosition, setModalPosition] = useState<{ top: string; left: string } | null>(null);
  const [activeCell, setActiveCell] = useState<HTMLElement | null>(null);

  const handleCellClick = useCallback(
    (
      event: MouseEvent<HTMLTableCellElement>,
      cellValue: number | string| number[],
      rowValue: string,
      columnHeader: string
    ) => {
      const cell = event.currentTarget;
      const cellRect = cell.getBoundingClientRect();
      const tableRect = tableRef.current?.getBoundingClientRect() || { top: 0, left: 0 };
      console.log()  
      const distanceFromTop = cellRect.bottom - tableRect.top;
      let distanceFromLeft = cellRect.left - tableRect.left;
    console.log(distanceFromLeft)
        if (distanceFromLeft > 935.75){
            distanceFromLeft = 935.75
        }
      setModalPosition({
        top: `${distanceFromTop + 100}px`,
        left: `${distanceFromLeft + 200}px`,
      });

      setActiveCell(cell);
      setModalContent({
        cellValue: Array.isArray(cellValue) ? cellValue : [], // Убедитесь, что cellValue - это массив
        rowValue,
        columnHeader,
      });
      setModalActive(true); // Устанавливаем активность модального окна при клике на ячейку
    },
    [tableRef]
  );

  useEffect(() => {
    if (!activeCell) {
      setModalActive(false); // Закрываем модальное окно, если активная ячейка отсутствует
    }
  }, [activeCell]);

  return {
    isModalActive,
    activeCell,
    modalContent,
    modalPosition,
    handleCellClick,
    setModalActive, // Важно: экспортируем setModalActive для возможности закрытия модального окна
  };
};
