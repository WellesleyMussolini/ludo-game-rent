import React from 'react';
import xmlJs from 'xml-js';
import { iGameApiData } from '../interfaces/game-api-data.interface';

export const generatePreviewBoardgame = async (
    id: string,
    handleGameApiData: React.Dispatch<React.SetStateAction<iGameApiData>>
) => {
    const response = await fetch(`https://thingproxy.freeboard.io/fetch/https://boardgamegeek.com/xmlapi/boardgame/${id}`);
    if (!response.ok) throw new Error('Network response was not ok');
    const xmlText = await response.text();
    const jsonData = JSON.parse(xmlJs.xml2json(xmlText, { compact: true, spaces: 2 }));

    // checks if the game data is from an array or an object
    const defaultName = Array.isArray(jsonData.boardgames.boardgame.name) ? jsonData.boardgames.boardgame.name[0]._text : jsonData.boardgames.boardgame.name._text;

    // access the image inside of the API
    const { _text } = jsonData.boardgames.boardgame.image;

    handleGameApiData({
        id,
        image: _text,
        name: defaultName,
        price: "40",
        status: "Disponível",
    });
};