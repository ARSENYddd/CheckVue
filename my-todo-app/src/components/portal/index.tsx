import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { PORTAL_ERROR_MSG } from "./constants";
import type { PortalProps } from "./types";

export const Portal: React.FC<PortalProps> = ({ id, children }) => {
  const [container, setContainer] = useState<HTMLElement>();

  useEffect(() => {
    if (id) {
      const portalContainer = document.getElementById(id);

      if (!portalContainer) {
        throw new Error(PORTAL_ERROR_MSG);
      }

      setContainer(portalContainer);
    }
  }, [id]);

  return container ? createPortal(children, container) : null;
};


