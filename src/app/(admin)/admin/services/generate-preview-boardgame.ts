import { CardStatus } from "@/app/common/components/card/boardgames/types/card.types";
import { BoardGame } from "@/app/common/types/boardgame.types";
import React from "react";
import xmlJs from "xml-js";

export const generatePreviewBoardgame = async (
  id: string,
  handleGameApiData: React.Dispatch<React.SetStateAction<BoardGame>>
) => {
  const response = await fetch(
    `https://thingproxy.freeboard.io/fetch/https://boardgamegeek.com/xmlapi/boardgame/${id}`
  );
  if (!response.ok) throw new Error("Network response was not ok");
  const xmlText = await response.text();
  const jsonData = JSON.parse(
    xmlJs.xml2json(xmlText, { compact: true, spaces: 2 })
  );

  const apiObjectAccess = (key: string) => {
    const data = jsonData.boardgames.boardgame[key];
    return Array.isArray(data) ? data[0]._text : data._text;
  };

  handleGameApiData({
    id,
    image: apiObjectAccess("image"),
    name: apiObjectAccess("name"),
    price: "40",
    status: CardStatus.AVAILABLE,
    ageToPlay: apiObjectAccess("age"),
    playTime: apiObjectAccess("playingtime"),
    minimumPlayersToPlay: apiObjectAccess("minplayers"),
    maximumPlayersToPlay: apiObjectAccess("maxplayers"),
    description: apiObjectAccess("description"),
    rentalDurationDays: "",
  });
};
