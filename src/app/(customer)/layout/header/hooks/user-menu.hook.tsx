import React from "react";

export const useUserMenu = () => {
    const [isDropdownOpen, setIsDropdownOpen] = React.useState<boolean>(false);
    const menuRef = React.useRef<HTMLDivElement>(null);

    const handleDropdownVisibility = () => setIsDropdownOpen(prev => !prev);

    const handleCloseDropdown = () => setIsDropdownOpen(false);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) return handleCloseDropdown();
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const menuOptions = [{ label: "Perfil" }, { label: "Sair" }];

    return { isDropdownOpen, menuOptions, handleDropdownVisibility, handleCloseDropdown, menuRef };
};