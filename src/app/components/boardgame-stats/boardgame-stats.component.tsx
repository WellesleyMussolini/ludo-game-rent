"use client"

import React from "react";
import { BsHourglassSplit } from "react-icons/bs";
import { MdGroups } from "react-icons/md";
import { IBoardgameStats } from "./boardgame-stats.interface";
import { FaBaby } from "react-icons/fa";

export const BoardgameStats = ({ boardgame, iconSize, styles }: IBoardgameStats) => {
    const boardgameMock = boardgame ? [
        { icon: MdGroups, text: "jogadores", value: `${boardgame.minimumPlayersToPlay}-${boardgame.maximumPlayersToPlay}` },
        { icon: BsHourglassSplit, text: "minutos", value: boardgame.playTime },
        { icon: FaBaby, text: "anos", value: boardgame.ageToPlay }
    ] : [];
    return (
        <ul className={styles}>
            {
                boardgameMock.map((information, index) => (
                    <li className="flex items-center justify-center gap-2" key={index}>
                        <information.icon className="text-[#48a3e0]" style={{ fontSize: iconSize }} />
                        <p className="0.8em">{information.value} {information.text}</p>
                    </li>
                ))
            }
        </ul>
    );
};
