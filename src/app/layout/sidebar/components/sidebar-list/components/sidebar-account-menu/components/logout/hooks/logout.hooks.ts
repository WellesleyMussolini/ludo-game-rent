import React from "react";
import { useContext } from "@/context/context";

export const useLogout = () => {
  const { userOptions, setUserOptions } = useContext();
  const dropdownRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const handleClickOutSide = (event: Event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      )
        return setUserOptions((prevState) => ({
          ...prevState,
          isUserOptionsOpen: false,
        }));
    };

    // Efficiently manage event listeners based on the dropdown state
    if (userOptions.isUserOptionsOpen) {
      document.addEventListener("mousedown", handleClickOutSide);
    } else {
      document.removeEventListener("mousedown", handleClickOutSide);
    }

    // Cleanup to remove the event listener when the component unmounts or isOpen changes
    return () => document.removeEventListener("mousedown", handleClickOutSide);
  }, [userOptions.isUserOptionsOpen, setUserOptions]);

  const toggleDropdown = () =>
    setUserOptions((prevState) => ({
      ...prevState,
      isUserOptionsOpen: !prevState.isUserOptionsOpen,
    }));

  const handleShowLogoutModal = () =>
    setUserOptions((prevState) => ({ ...prevState, isLogoutModalOpen: true }));

  return {
    userOptions,
    dropdownRef,
    handleShowLogoutModal,
    toggleDropdown,
  };
};
