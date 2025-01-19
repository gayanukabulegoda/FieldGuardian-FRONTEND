import { createPortal } from 'react-dom';
import React from "react";

interface PortalProps {
    children: React.ReactNode;
}

export const Portal: React.FC<PortalProps> = ({ children }) => {
    return createPortal(children, document.body);
};