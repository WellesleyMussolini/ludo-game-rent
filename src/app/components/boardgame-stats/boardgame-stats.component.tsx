import { BsHourglassSplit } from "react-icons/bs";
import { MdGroups } from "react-icons/md";
import { IBoardgameStats } from "./boardgame-stats.interface";
import { FaBaby } from "react-icons/fa";
import { IBoardGame } from "@/interfaces/boardgame.interface";
import React from "react";

export const BoardgameStats = ({ minimumPlayersToPlay, maximumPlayersToPlay, playTime, ageToPlay, iconSize, styles }: IBoardgameStats) => {
    const boardgameMock = [
        { icon: MdGroups, text: "jogadores", value: `${minimumPlayersToPlay}-${maximumPlayersToPlay}` },
        { icon: BsHourglassSplit, text: "minutos", value: playTime },
        ageToPlay && { icon: FaBaby, text: "anos", value: ageToPlay } // Only include if ageToPlay is provided
    ].filter(Boolean); // Filter out falsy values (null, undefined, etc.)

    return (
        <ul className={styles}>
            {
                boardgameMock.map((information, index) => (
                    <div className="flex items-center gap-2" key={index}>
                        <information.icon className="text-[#48a3e0]" style={{ fontSize: iconSize }} />
                        <p className="0.8em">{information.value} {information.text}</p>
                    </div>
                ))
            }
        </ul>
    );
};