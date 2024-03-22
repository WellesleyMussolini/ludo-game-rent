export enum EnumCardStatus {
    AVAILABLE = "Disponível",
    RESERVED = "Reservado",
    FIXED_COPY="Cópia Fixa",
    QUARANTINE="Quarentena",
    UNAVAILABLE="Indisponível",
    MAINTENANCE="Manutenção",
    RENT="Alugado",
};

export interface ICard {
    name: string,
    image: string,
    price: string,
    status: string,

    isEditing?: boolean,
    isLoading?: boolean,
    
    handleEditGame?: () => void,
    handleDeleteGame?: () => void,
    handleRentGame?: () => void,
};