import React from "react";

export const useOverlay = (onClose: () => void) => {
  React.useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const handleOverlayClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onClose();
  };

  return {
    handleOverlayClick,
  };
};
