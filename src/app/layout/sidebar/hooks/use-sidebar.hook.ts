"use client";

import React from "react";
import { useContext } from "@/context/context";
import { useMediaQuery } from "@react-hook/media-query";
import { useRouter } from "next/navigation";
import { EnumSidebarMobileVisibility } from "../interfaces/sidebar.enum";

export const useSidebar = () => {
  const { expandedSidebar, setExpandedSidebar } = useContext();
  const [animation, setAnimation] = React.useState<string>(
    EnumSidebarMobileVisibility.SIDEBAR_VISIBLE
  );
  const isMobile = useMediaQuery("(max-width: 640px)");
  const router = useRouter();

  const toggleSidebarVisibility = () => setExpandedSidebar(!expandedSidebar);

  const handleSwitchRoute = async(route: string) => {
    await router.push(route);
    setExpandedSidebar(false);
  };

  React.useEffect(() => {
    setAnimation(
      expandedSidebar
        ? EnumSidebarMobileVisibility.SIDEBAR_HIDDEN
        : EnumSidebarMobileVisibility.SIDEBAR_VISIBLE
    );
  }, [expandedSidebar, isMobile]);
  return {
    router,
    isMobile,
    animation,
    toggleSidebarVisibility,
    handleSwitchRoute,
  };
};
