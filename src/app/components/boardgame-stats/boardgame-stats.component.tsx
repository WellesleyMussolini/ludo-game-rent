"use client";

import React from "react";
import { BsHourglassSplit } from "react-icons/bs";
import { MdGroups } from "react-icons/md";
import { IBoardgameStats } from "./boardgame-stats.interface";
import { FaBaby } from "react-icons/fa";

export const BoardgameStats = ({
  boardgame,
  iconSize,
  styles,
}: IBoardgameStats) => {
  const boardgameMock = boardgame
    ? [
        {
          icon: MdGroups,
          text: "jogadores",
          value: `${boardgame.minimumPlayersToPlay}-${boardgame.maximumPlayersToPlay}`,
        },
        { icon: BsHourglassSplit, text: "minutos", value: boardgame.playTime },
        { icon: FaBaby, text: "anos", value: boardgame.ageToPlay },
      ]
    : [];

  return (
    <div className={styles}>
      {boardgameMock.map((information, index) => (
        <span className="flex text-white items-center gap-2" key={index}>
          <information.icon style={{ fontSize: iconSize }} />
          <p className="0.8em">
            {information.value} {information.text}
          </p>
        </span>
      ))}
    </div>
  );
};

//info dos cards
