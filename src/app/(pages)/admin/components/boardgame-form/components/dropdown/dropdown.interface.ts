export interface IBoardGameDropdown { 
    status: Array<string>, 
    boardgameStatus: string, 
    handleOnChangeFields: (field: string, value: string) => void,
};