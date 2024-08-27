import type { CSSProperties } from "react";

export interface ModalProps {
  title: string;
  onClose?: () => void;
  children: React.ReactNode | React.ReactNode[];
  style?: CSSProperties;
}
