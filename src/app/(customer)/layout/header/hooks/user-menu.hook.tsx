import React from "react";
import { useRouter } from "next/navigation";
import { useUserSession } from "@/app/hooks/session.hook";
import { useContext } from "@/app/common/context/context";

export const useUserMenu = () => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState<boolean>(false);
  const { modals, setModals } = useContext();
  const { session } = useUserSession();
  const menuRef = React.useRef<HTMLDivElement>(null);

  const router = useRouter();

  const handleDropdownVisibility = () => setIsDropdownOpen((prev) => !prev);

  const handleCloseDropdown = () => setIsDropdownOpen(false);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node))
        return handleCloseDropdown();
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const userInfo = {
    userId: session?.user.id ?? "",
    userImage: session?.user.image ?? "",
    userName: session?.user.name ?? "",
  };

  const menuOptions = [
    {
      label: "Perfil",
      onClick: () => router.push("user"),
    },
    {
      label: "Sair",
      onClick: () => setModals({ ...modals, logout: true }),
    },
  ];

  return {
    isDropdownOpen,
    menuOptions,
    handleDropdownVisibility,
    handleCloseDropdown,
    menuRef,
    userInfo,
  };
};
