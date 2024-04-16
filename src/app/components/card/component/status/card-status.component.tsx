import { EnumCardStatus } from "../../card.interface";

interface ICardStatus {
    status: string, 
    styles: string,
};

export const CardStatus = ({ status, styles }: ICardStatus) => {
    const statusColors = {
        [EnumCardStatus.AVAILABLE]: "bg-primary text-white",
        [EnumCardStatus.FIXED_COPY]: "bg-white text-gray-600",
        [EnumCardStatus.MAINTENANCE]: "bg-orange-500 text-white",
        [EnumCardStatus.QUARANTINE]: "bg-yellow-500 text-white",
        [EnumCardStatus.RENT]: "bg-white text-gray-600", 
        [EnumCardStatus.RESERVED]: "bg-[#17a2b8] text-white", 
        [EnumCardStatus.UNAVAILABLE]: "bg-gray-500 text-white",
    };
    return (
        <div className={styles}>
            <div className={`flex justify-center items-center text-center px-3 py-1 rounded-full font-bold ${statusColors[status as EnumCardStatus]}`}>{status}</div>
        </div>
    );
};