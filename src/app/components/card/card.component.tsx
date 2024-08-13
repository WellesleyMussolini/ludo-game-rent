"use client";

import { useState } from "react";
import { ImageComponent } from "../image/image.component";
import { EnumPrimaryButton } from "../primary-button/types/primary-button.types";
import { ICard } from "./card.interface";
import { useCard } from "./hooks/use-card.hook";
import { PrimaryButton } from "../primary-button/primary-button.component";
import { useHandleRentGame } from "@/app/hooks/handle-rent-game.hook";

export const Card = ({ boardgame }: ICard) => {
  const { redirectToBoardgameAbout } = useCard(boardgame);
  const { handleRentGame } = useHandleRentGame(boardgame);
  const [isHovered, setIsHovered] = useState(false);
  const shadowStyle = {
    boxShadow: isHovered
      ? "4px 4px 0px rgba(0, 0, 0, 0.75)"
      : "8px 8px 0px rgba(0, 0, 0, 0.75)",
  };

  return (
    <div
      className="bg-white cursor-pointer rounded-md w-[250px] h-[380px] border-2 border-zinc-900 transition ease-in-out delay-35 hover:translate-y-1 relative"
      style={shadowStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={redirectToBoardgameAbout}
    >
      <div className="relative h-[60%]">
        <ImageComponent
          enableOpacity
          image={boardgame.image ?? ""}
          alt={boardgame.name ?? ""}
          layoutType="fill"
          width="100%"
          height="100%"
        />
        <p
          className="
        font-cardName
        absolute 
        bottom-4 
        left-4 
        font-black 
        text-xl 
        z-20 
        text-white 
        break-words
        drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
        >
          {boardgame.name}
        </p>
      </div>

      <div className="absolute bottom-4 w-full flex items-start flex-col gap-1 px-5">
        {/* <BoardgameStats /> */}
        <p className="text-primary flex text-xl">R${boardgame.price}</p>
        <PrimaryButton
          styles="text-[12px]"
          text="alugar"
          type={EnumPrimaryButton.OUTLINED}
          onClick={(event) => {
            event.stopPropagation(); // Prevents the user to switch page
            handleRentGame(); // Call the handleRentGame function
          }}
        />
      </div>
    </div>
  );
};
