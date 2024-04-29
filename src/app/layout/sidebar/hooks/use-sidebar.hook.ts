"use client";

import React from "react";
import { useContext } from "@/context/context";
import { useMediaQuery } from "@react-hook/media-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { EnumSidebarMobileVisibility } from "../interfaces/sidebar.enum";

export const useSidebar = () => {
  const { expandedSidebar, setExpandedSidebar } = useContext();
  const [animation, setAnimation] = React.useState<string>(
    EnumSidebarMobileVisibility.SIDEBAR_VISIBLE
  );
  const isMobile = useMediaQuery("(max-width: 640px)");
  const { data: session, status } = useSession();
  const router = useRouter();

  const authenticated = status === "authenticated";
  const isLoading = status === "loading";

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
    expandedSidebar,
    setExpandedSidebar,
    session,
    authenticated,
    router,
    isLoading,
    isMobile,
    animation,
    toggleSidebarVisibility,
    handleSwitchRoute,

  };
};
