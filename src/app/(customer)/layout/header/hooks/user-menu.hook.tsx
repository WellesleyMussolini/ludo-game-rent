import React from "react";
import { useRouter } from "next/navigation";
import { useUserSession } from "@/app/common/hooks/session.hook";
import { useContext } from "@/app/common/context/context";

export const useUserMenu = () => {
  const { isVisible, setIsVisible } = useContext();
  const { session } = useUserSession();
  const menuRef = React.useRef<HTMLDivElement>(null);

  const router = useRouter();

  const handleDropdownVisibility = () =>
    setIsVisible({ ...isVisible, dropdown: !isVisible.dropdown });

  const handleCloseDropdown = () =>
    setIsVisible({ ...isVisible, dropdown: false });

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
    userImage: session?.user.image ?? "",
    userName: session?.user.name ?? "",
  };

  const menuOptions = [
    {
      label: "Perfil",
      onClick: () => {
        router.push("user");
        handleCloseDropdown();
      },
    },
    {
      label: "Carrinho",
      onClick: () => {
        router.push("cart");
        handleCloseDropdown();
      },
    },
    {
      label: "Sair",
      onClick: () => setIsVisible({ ...isVisible, logout: true }),
    },
  ];

  return {
    isVisible,
    menuOptions,
    handleDropdownVisibility,
    handleCloseDropdown,
    menuRef,
    userInfo,
  };
};
