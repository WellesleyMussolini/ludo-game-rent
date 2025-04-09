import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserSession } from "@/app/common/hooks/session.hook";
import { signOut } from "next-auth/react";
import { handleAnimationCloseModal } from "@/app/common/utils/handle-animation-close";
import { Animations } from "@/app/common/types/animations.enum";

export const useHeader = () => {
  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);
  const { isAuthenticated, isUserSessionLoading, session } = useUserSession();

  const [isLogoutLoading, setIsLogoutLoading] = React.useState<boolean>(false);

  const [animation, setAnimation] = React.useState<string>(
    Animations.ANIMATION_JUMP_IN
  );

  const closeModal = (): void =>
    handleAnimationCloseModal({
      handleAnimation: setAnimation,
      handleModalVisibility: setIsLogoutModalOpen,
    });

  const logout = async () => {
    setIsLogoutLoading(true);
    await signOut();
    setIsLogoutLoading(false);
  };

  const redirect = useRouter();

  const menuRef = React.useRef<HTMLDivElement>(null);

  const router = useRouter();

  const handleOpenDropdown = () => setIsOpenDropdown((prev) => !prev);

  const handleCloseDropdown = React.useCallback(
    () => setIsOpenDropdown(false),
    []
  );

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
        setIsLogoutModalOpen(true);
        handleCloseDropdown();
      },
    },
  ];

  return {
    redirect,
    isAuthenticated,
    isUserSessionLoading,
    menuOptions,
    menuRef,
    userInfo,
    isOpenDropdown,
    isLogoutModalOpen,
    animation,
    isLogoutLoading,
    logout,
    closeModal,
    handleOpenDropdown,
  };
};
