import { BsHourglassSplit } from "react-icons/bs";
import { MdGroups } from "react-icons/md";
import { ICardInfo } from "./card-info.interface";

export const CardInfo = ({ minimumPlayers, maximumPlayers, playTime }: ICardInfo) => {
    const cardMock = [
        { icon: MdGroups, text: "jogadores", value: `${minimumPlayers}-${maximumPlayers}` },
        { icon: BsHourglassSplit, text: "minutos", value: playTime }
    ];
    return <div className="text-gray-500 flex flex-row max-[340px]:flex-col max-[340px]:gap-2 px-4 mt-3 justify-between">
        {
            cardMock.map((information, index) => (
                <div className="flex items-center gap-2" key={index}>
                    <information.icon className="text-[#48a3e0] text-base" />
                    <p className="text-[0.8rem]">{information.value} {information.text}</p>
                </div>
            ))
        }
    </div>;
};