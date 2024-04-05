"use client"

import { EnumCardStatus, ICard } from "./card.interface";
import { formatCurrency } from "../../../utils/format-currency";
import { PrimaryButton } from "../primary-button/primary-button.component";
import { EnumPrimaryButton } from "../primary-button/primary-button.interface";
import { ImageComponent } from "../image/image.component";
import { CardStatus } from "./component/status/card-status.component";
import { BoardgameStats } from "../boardgame-stats/boardgame-stats.component";
import { useRouter } from "next/navigation";

export const Card = ({ boardgame }: ICard) => {
    const router = useRouter();
    return (
        <div onClick={() => router.push(`/boardgame/${boardgame.id}`)}
            className="bg-white 
            max-[350px]:w-[77.14%] w-[270px] h-[316px] max-[340px]:h-[366px] 
            rounded-md shadow-cardShadow z-10 cursor-pointer">
            <div className="relative w-full bg-secondary h-[54%] z-10 leading-5 rounded-t-md">
                <CardStatus status={boardgame.status} />
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30 z-20 rounded-t-md"></div>
                <ImageComponent image={boardgame.image} alt={boardgame.name} className="rounded-t-md" />
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
                px-4 mt-3 
                justify-between 
                text-[13px]"
            />

            {/* currency */}
            <div className="relative w-full flex flex-col gap-3 mt-3 items-start px-4 h-[46%] z-30">
                <h5 className="text-2xl font-black text-primary tracking-[.08rem]">{formatCurrency(boardgame.price)}</h5>

                {/* checks if the game status is available to be rent */}
                {EnumCardStatus.AVAILABLE === boardgame.status && (
                    <div className="w-full">
                        <PrimaryButton
                            loadingSize={20}
                            handleClick={(event: React.MouseEvent<HTMLElement>) => {
                                event.stopPropagation(); // Stop the click event from propagating
                                router.push("/cart"); // Redirect to the cart route
                            }}
                            text="alugar"
                            type={EnumPrimaryButton.OUTLINED}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};