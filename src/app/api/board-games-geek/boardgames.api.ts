// import axios from 'axios';
// import { parseStringPromise } from 'xml2js';

// async function fetchBoardGameById(id: number): Promise<any> {
//     const response = await axios.get(`https://boardgamegeek.com/xmlapi/boardgame/${id}`);
//     const xmlData = response.data;
//     return parseStringPromise(xmlData);
// }

// export default async function API_handler(id: number) {
//     try {
//         const boardGame = await fetchBoardGameById(id);
//         return boardGame;
//     } catch (error) {
//         console.error(`Error fetching board game with ID ${id}:`, error);
//         throw new Error(`Failed to fetch board game with ID ${id}`);
//     }
// }


import axios from 'axios';
import { parseStringPromise } from 'xml2js';

async function fetchBoardGameById(id: number): Promise<any> {
    const response = await axios.get(`https://cors-anywhere.herokuapp.com/https://boardgamegeek.com/xmlapi/boardgame/${id}`);
    const xmlData = response.data;
    return parseStringPromise(xmlData);
}

export default async function API_handler(id: number) {
    try {
        const boardGame = await fetchBoardGameById(id);
        return boardGame;
    } catch (error) {
        console.error(`Error fetching board game with ID ${id}:`, error);
        throw new Error(`Failed to fetch board game with ID ${id}`);
    }
}
