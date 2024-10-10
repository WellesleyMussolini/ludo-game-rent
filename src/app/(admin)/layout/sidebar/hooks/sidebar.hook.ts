"use client";

import React from "react";
import { useContext } from "@/app/common/context/context";
import { useMediaQuery } from "@react-hook/media-query";
import { useRouter } from "next/navigation";
import { EnumSidebarMobileVisibility } from "../types/sidebar.enum";

export const useSidebar = () => {
  const { isVisible, setIsVisible } = useContext();
  const [animation, setAnimation] = React.useState<string>(
    EnumSidebarMobileVisibility.SIDEBAR_VISIBLE
  );
  const isMobile = useMediaQuery("(max-width: 640px)");
  const router = useRouter();

  const toggleSidebarVisibility = () =>
    setIsVisible({ ...isVisible, sidebar: !isVisible.sidebar });

  const handleSwitchRoute = async (route: string) => {
    await router.push(route);
    setIsVisible({ ...isVisible, sidebar: false });
  };

  React.useEffect(() => {
    setAnimation(
      isVisible.sidebar
        ? EnumSidebarMobileVisibility.SIDEBAR_HIDDEN
        : EnumSidebarMobileVisibility.SIDEBAR_VISIBLE
    );
  }, [isVisible.sidebar, isMobile]);
  return {
    router,
    isMobile,
    animation,
    toggleSidebarVisibility,
    handleSwitchRoute,
  };
};
