import { EnumCardStatus } from "../../card.interface";

export const CardStatus = ({ status }: { status: string }) => {
    const statusColors = {
        [EnumCardStatus.AVAILABLE]: "bg-primary text-white",
        [EnumCardStatus.FIXED_COPY]: "bg-white text-gray-600",
        [EnumCardStatus.MAINTENANCE]: "bg-orange-500 text-white",
        [EnumCardStatus.QUARANTINE]: "bg-yellow-500 text-white",
        [EnumCardStatus.RENT]: "bg-blue-500 text-white",
        [EnumCardStatus.RESERVED]: "bg-secondary text-white",
        [EnumCardStatus.UNAVAILABLE]: "bg-gray-500 text-white",
    };
    return (
        <div className="relative flex justify-start w-full z-30 p-3">
            <div className={`flex justify-center items-center text-center px-4 py-1 rounded-full font-bold w-32 text-sm ${statusColors[status as EnumCardStatus]}`}>{status}</div>
        </div>
    );
};