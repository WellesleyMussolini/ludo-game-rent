// database interface

export interface IBoardGame {
    name: string,
    image: string,
    price: string,
    status: string,
    ageToPlay: string,
    playTime: string,
    playersToPlay: {
        minimum: string,
        maximum: string,
    },
    description: string,
};