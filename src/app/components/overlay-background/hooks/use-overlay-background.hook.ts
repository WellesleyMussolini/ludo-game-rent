import React from "react";

export const userOverlayBackground = (onClick: () => void) => {
  // Custom hook for managing body overflow and pointer-events
  function useBodyLock(isLocked = true) {
    React.useEffect(() => {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = isLocked ? "hidden" : originalOverflow;

      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }, [isLocked]);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent click from propagating to lower elements
    onClick(); // Execute callback function
  };

  return{
    useBodyLock,
    handleOverlayClick,
  }
};
