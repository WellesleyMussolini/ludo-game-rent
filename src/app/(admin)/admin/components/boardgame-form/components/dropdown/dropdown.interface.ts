export interface IBoardGameDropdown { 
    statusList: Array<string>, 
    boardgameStatus: string, 
    handleOnChangeFields: (field: string, value: string) => void,
};