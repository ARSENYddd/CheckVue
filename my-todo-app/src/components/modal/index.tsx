import React, { useEffect, useRef, useState } from "react";
import { createContainer } from "../portal/createContainer";
import { Portal } from "../portal/index";
import Styles from "./index.module.css";
import type { ModalProps } from "./types";

const MODAL_CONTAINER_ID = "modal-container-id";

const Modal: React.FC<ModalProps> = ({ title, onClose, children, style }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    createContainer({ id: MODAL_CONTAINER_ID });
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleWrapperClick = (event: MouseEvent) => {
      if (rootRef.current && rootRef.current === event.target) {
        console.log('ssssssssss')
        onClose?.();
      }
    };

    const handleEscapePress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        console.log('sssssssss22222s')
        onClose?.();
      }
    };

    window.addEventListener("click", handleWrapperClick);
    window.addEventListener("keydown", handleEscapePress);

    return () => {
      window.removeEventListener("click", handleWrapperClick);
      window.removeEventListener("keydown", handleEscapePress);
    };
  }, [onClose]);

  return isMounted ? (
    <Portal id={MODAL_CONTAINER_ID}>
      <div className={Styles.wrap} ref={rootRef} data-testid="wrap" style={style}>
        <div className={Styles.content}>
          <button
            type="button"
            className={Styles.closeButton}
            onClick={() => {
              console.log("Close button clicked");
              onClose?.();
            }}
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
