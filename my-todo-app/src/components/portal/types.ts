import type { ReactNode } from "react";

export interface PortalProps {
  id: string;
  children: ReactNode;
}
export type ContainerOptions = {
    id: string;
    mountNode?: HTMLElement;
};
  