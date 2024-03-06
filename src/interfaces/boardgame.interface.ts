// database interface

export interface IBoardGame {
    name: string,
    image: string,
    situation: "Cópia Fixa" | "Reservado" | "Quarentena" | "Indisponível" | "Manutenção" | "Alugado" | "Disponível",
    price: string,
};