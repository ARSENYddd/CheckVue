import type { ContainerOptions } from "./types";

    export const createContainer = ({ id, mountNode = document.body }: ContainerOptions) => {
        if (document.getElementById(id)) {
        return;
        }
    
        const portalContainer = document.createElement("div");
        portalContainer.setAttribute("id", id);
        portalContainer.setAttribute("data-testid", `portalContainer-${id}`);
        mountNode.appendChild(portalContainer);
    };
    