export enum EnumSidebarPathname {
    HOME="/",
    ABOUT="/about",
    CART="/cart",
    USER="/user",
    AUTH="/login",

    // PRIVATE ROUTES
    ADMIN="/admin",
    ADMIN_AUTH="/admin/login",
    ADMIN_ORDERS="/admin/orders",
    ADMIN_USERS="/admin/users"
};

export enum EnumSidebarMobileVisibility {
    SIDEBAR_VISIBLE="-translate-x-full",
    SIDEBAR_HIDDEN="translate-x-0",
}; 

export enum EnumSidebarType {
    MOBILE="w-72 max-[400px]:w-full sm:hidden transition-transform flex flex-col",
    DESKTOP="hidden sm:flex sm:flex-col",
};