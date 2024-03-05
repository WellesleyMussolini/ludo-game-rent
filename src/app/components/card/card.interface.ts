export interface ICard {
    name: string,
    image: string,
    price: string,

    isEditing?: boolean,
    isLoading?: boolean,
    
    handleSave?: () => void,
    handleDelete?: () => void,
};