import React from "react";
import { userOverlayBackground } from "./hooks/use-overlay-background.hook";

export const OverlayBackground = ({ onClick }: { onClick: () => void }) => {
    const { handleOverlayClick, useBodyLock } = userOverlayBackground(onClick);
    useBodyLock();
    return (
        <div className="fixed top-0 opacity-30 h-screen w-screen bg-black z-40" onClick={handleOverlayClick}></div>
    );
};