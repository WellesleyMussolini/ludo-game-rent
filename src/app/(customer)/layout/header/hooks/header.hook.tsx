import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserSession } from "@/app/common/hooks/session.hook";
import { useContext } from "@/app/common/context/context";

export const useHeader = () => {
  const { isVisible, setIsVisible } = useContext();

  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);
  const { session } = useUserSession();
  const { isAuthenticated, isLoading } = useUserSession();
  const redirect = useRouter();

  const menuRef = React.useRef<HTMLDivElement>(null);

  const router = useRouter();

  const handleOpenDropdown = () => setIsOpenDropdown((prev) => !prev);

  const handleCloseDropdown = () => setIsOpenDropdown(false);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node))
        return handleCloseDropdown();
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleCloseDropdown, menuRef]);

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
      onClick: () => {
        setIsVisible({ ...isVisible, logout: true });
        handleCloseDropdown();
      },
    },
  ];

  return {
    redirect,
    isAuthenticated,
    isLoading,
    menuOptions,
    isOpenDropdown,
    handleOpenDropdown,
    menuRef,
    userInfo,
  };
};
