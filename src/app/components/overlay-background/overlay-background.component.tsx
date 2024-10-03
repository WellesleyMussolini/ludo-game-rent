import React from "react";
import { useOverlay } from "@/app/components/overlay-background/hooks/use-overlay.hook";

export const OverlayBackground = ({ onClose }: { onClose: () => void }) => {
  const { handleOverlayClick } = useOverlay(onClose);
  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen bg-black opacity-30 z-40"
      onClick={handleOverlayClick}
    ></div>
  );
};
