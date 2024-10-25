export enum EnumSidebarMobileVisibility {
  SIDEBAR_VISIBLE = "-translate-x-full",
  SIDEBAR_HIDDEN = "translate-x-0",
}

export enum EnumSidebarResponsive {
  MOBILE = "w-72 max-[400px]:w-full md:hidden transition-transform flex flex-col",
  DESKTOP = "hidden md:flex sm:flex-col",
}
