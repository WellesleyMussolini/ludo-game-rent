import Image from "next/image";
import { ICard } from "./card.interface";
import { formatCurrency } from "./utils/format-currency";
import { PrimaryButton } from "../primary-button/primary-button.component";
import { EnumPrimaryButton } from "../primary-button/primary-button.interface";

export const Card = ({ image, name, price, isEditing, isLoading, handleSave, handleDelete }: ICard) => {
    const currency = formatCurrency(price);
    return <div className="bg-white max-[350px]:w-[77.14%] w-[270px] h-[316px] rounded-md shadow-md">
        <div className="relative w-full bg-secondary h-[64%] z-10 leading-5 rounded-t-md">
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30 z-10 rounded-t-md"></div>
            <Image
                src={image}
                alt={name} width={0} height={0}
                layout='fill'
                objectFit='cover'
                className="w-full h-full bg-center object-cover overflow-hidden select-none touch-none" />
            <p className="absolute bottom-4 left-4 font-black text-xl z-20 text-white shadow-cardName drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">{name}</p>
        </div>

        {/* currency */}
        <div className="relative w-full flex flex-col gap-3 mt-3 items-start px-4 h-[36%]">
            <h5 className="text-2xl font-black text-primary tracking-[.08rem]">{currency}</h5>
            {
                isEditing &&
                <div className="flex gap-2 w-full">
                    <PrimaryButton loadingSize={20} isLoading={isLoading} handleClick={handleSave} text="salvar" type={EnumPrimaryButton.OUTLINED} />
                    <PrimaryButton handleClick={handleDelete} text="deletar" type={EnumPrimaryButton.DELETE} />
                </div>
            }
        </div>

    </div>
};