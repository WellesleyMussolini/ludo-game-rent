import { BsHourglassSplit } from "react-icons/bs";
import { MdGroups } from "react-icons/md";
import { ICardInfo } from "./card-info.interface";

export const CardInfo = ({minimumPlayers, maximumPlayers, playTime}: ICardInfo) => <div className="flex flex-row max-[340px]:flex-col max-[340px]:gap-2 px-4 mt-3 justify-between">
    <div className="flex items-center gap-2">
        <MdGroups className="text-[#48a3e0] text-base" />
        <p className="text-sm">{minimumPlayers}-{maximumPlayers} jogadores</p>
    </div>

    <div className="flex items-center gap-2">
        <BsHourglassSplit className="text-[#48a3e0] text-base" />
        <p className="text-sm">{playTime} minutos</p>
    </div>
</div>;