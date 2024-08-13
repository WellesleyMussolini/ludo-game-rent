import React from "react";

export const useBoardgameDropdownStatus = (statusList: Array<string>, handleOnChangeFields: (field: string, value: string) => void) => {
    const [isDropdownOpen, setIsDropdownOpen] = React.useState<boolean>(false);

    const dropdownContent = React.useMemo(() => {
        return statusList.map((chosenStatus: string, index: number) => (
            <li key={index}
                className="select-none w-full flex items-center gap-2 px-4 cursor-pointer duration-200 hover:bg-primary hover:rounded hover:text-white py-2"
                onDragStart={(event) => event.preventDefault()}
                onClick={() => {
                    handleOnChangeFields("status", chosenStatus);
                    setIsDropdownOpen(false);
                }}>
                <p className="text-base font-medium">{chosenStatus}</p>
            </li>
        ));
    }, [statusList, handleOnChangeFields]);

    return {
        isDropdownOpen,
        setIsDropdownOpen,
        dropdownContent
    };
};