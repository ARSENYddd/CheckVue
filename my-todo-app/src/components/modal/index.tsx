import React, { useCallback, useEffect, useRef, useState } from "react";
import type { MouseEventHandler, CSSProperties } from "react";

import Portal, { createContainer } from "../portal";

import Styles from "./index.module.css";

const MODAL_CONTAINER_ID = "modal-container-id";

type Props = {
  title: string;
  onClose?: () => void;
  children: React.ReactNode | React.ReactNode[];//////// з
  style?: CSSProperties; // Добавлено свойство style
};

const Modal = (props: Props) => {

  const { title, onClose, children, style } = props;
  const rootRef = useRef<HTMLDivElement>(null);
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    createContainer({ id: MODAL_CONTAINER_ID });
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleWrapperClick = (event: MouseEvent) => {
      const { target } = event;
      if (target instanceof Node && rootRef.current === target) {
        onClose?.();
      }
    };
    const handleEscapePress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("click", handleWrapperClick);
    window.addEventListener("keydown", handleEscapePress);

    return () => {
      window.removeEventListener("click", handleWrapperClick);
      window.removeEventListener("keydown", handleEscapePress);
    };
  }, []);


  return isMounted ? (
    <Portal id={MODAL_CONTAINER_ID}>
      <div className={Styles.wrap} ref={rootRef} data-testid="wrap" style={style}>
        <div className={Styles.content}>
          <button
            type="button"
            className={Styles.closeButton}
            onClick={onClose}
            data-testid="modal-close-button"
          >
            Х
          </button>
          <p className={Styles.title}>{title}</p>
          {children}
        </div>
      </div>
    </Portal>
  ) : null;
};

export default Modal;
