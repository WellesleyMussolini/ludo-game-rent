import Image from "next/image";
import { EnumCardStatus, ICard } from "./card.interface";
import { formatCurrency } from "./utils/format-currency";
import { PrimaryButton } from "../primary-button/primary-button.component";
import { EnumPrimaryButton } from "../primary-button/primary-button.interface";

export const Card = ({ image, name, price, isEditing, isLoading, status, handleEditGame, handleDeleteGame, handleRentGame }: ICard) => {
    const currency = formatCurrency(price);

    const statusColors = {
        [EnumCardStatus.AVAILABLE]: "bg-primary text-white",
        [EnumCardStatus.FIXED_COPY]: "bg-white text-gray-600",
        [EnumCardStatus.MAINTENANCE]: "bg-orange-500 text-white",
        [EnumCardStatus.QUARANTINE]: "bg-yellow-500 text-white",
        [EnumCardStatus.RENT]: "bg-blue-500 text-white",
        [EnumCardStatus.RESERVED]: "bg-secondary text-white",
        [EnumCardStatus.UNAVAILABLE]: "bg-gray-500 text-white",
    };
    return <div className="bg-white max-[350px]:w-[77.14%] w-[270px] h-[316px] rounded-md shadow-md">
        <div className="relative w-full bg-secondary h-[64%] z-10 leading-5 rounded-t-md">

            <div className={`absolute z-30 top-3 left-4 flex items-center justify-center text-center
                ${statusColors[status as EnumCardStatus]} text-sm
                px-4 py-1 rounded-full font-bold`}>{status}</div>

            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30 z-20 rounded-t-md"></div>
            <Image
                src={image}
                alt={name} width={0} height={0}
                layout='fill'
                objectFit='cover'
                className="w-full h-full bg-center object-cover overflow-hidden select-none touch-none z-10 rounded-t-md" />
            <p className="absolute bottom-4 left-4 font-black text-xl z-20 text-white shadow-cardName drop-shadow-4xl">{name}</p>
        </div>

        {/* currency */}
        <div className="relative w-full flex flex-col gap-3 mt-3 items-start px-4 h-[36%]">
            <h5 className="text-2xl font-black text-primary tracking-[.08rem]">{currency}</h5>
            {
                isEditing ?
                    <div className="flex gap-2 w-full">
                        <PrimaryButton loadingSize={20} isLoading={isLoading} handleClick={handleEditGame} text="editar" type={EnumPrimaryButton.OUTLINED} />
                        <PrimaryButton handleClick={handleDeleteGame} text="deletar" type={EnumPrimaryButton.DELETE} />
                    </div>
                    :
                    <div className="w-full">
                        <PrimaryButton loadingSize={20} isLoading={isLoading} handleClick={handleRentGame} text="alugar" type={EnumPrimaryButton.OUTLINED} />
                    </div>
            }
        </div>

    </div>
};