"use client"

import { EnumCardStatus, ICard } from "./card.interface";
import { formatCurrency } from "../../../utils/format-currency";
import { PrimaryButton } from "../primary-button/primary-button.component";
import { EnumPrimaryButton } from "../primary-button/primary-button.interface";
import { ImageComponent } from "../image/image.component";
import { CardStatus } from "./component/status/card-status.component";
import { BoardgameStats } from "../boardgame-stats/boardgame-stats.component";
import { useCard } from "./hooks/use-card.hook";

export const Card = ({ boardgame }: ICard) => {
    const { redirectToBoardgameAbout, handleRentGame } = useCard(boardgame);
    return (
        <div
            onClick={redirectToBoardgameAbout}
            className="bg-white 
            max-[350px]:w-[77.14%] w-[270px] h-[316px] max-[340px]:h-[366px] 
            rounded-md shadow-cardShadow z-10 cursor-pointer">

            <div className="relative w-full bg-secondary h-[54%] z-10 leading-5 rounded-t-md">
                <div className="absolute"><CardStatus status={boardgame.status} /></div>
                <ImageComponent
                    enableOpacity
                    height="100%"
                    width="100%"
                    image={boardgame.image}
                    alt={boardgame.name}
                    className="rounded-t-md"
                />
                <p className="absolute bottom-4 left-4 font-black text-xl z-20 text-white shadow-cardName drop-shadow-4xl break-words">
                    {boardgame.name}
                </p>
            </div> 

            {/* number of players to play & average time to beat the game */}
            <BoardgameStats
                maximumPlayersToPlay={boardgame.maximumPlayersToPlay}
                minimumPlayersToPlay={boardgame.minimumPlayersToPlay}
                playTime={boardgame.playTime}
                iconSize="1.4em"
                styles="text-gray-500 
                flex 
                flex-row 
                max-[340px]:flex-col 
                max-[340px]:gap-2
                max-[340px]:w-full
                max-[340px]:items-start 
                px-4 
                mt-3 
                justify-between 
                text-[13px]"
            />

            <div className="relative w-full flex flex-col gap-3 mt-3 items-start px-4 z-30">
                {/* currency */}
                <h5 className="text-2xl font-black text-primary tracking-[.08rem]">{formatCurrency(boardgame.price)}</h5>

                {/* checks if the game status is available to be rent */}
                {EnumCardStatus.AVAILABLE === boardgame.status && (
                    <div className="w-full">
                        <PrimaryButton
                            loadingSize={20}
                            onClick={handleRentGame}
                            text="alugar"
                            type={EnumPrimaryButton.OUTLINED}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};