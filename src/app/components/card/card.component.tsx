import { EnumCardStatus, ICard } from "./card.interface";
import { formatCurrency } from "./utils/format-currency";
import { PrimaryButton } from "../primary-button/primary-button.component";
import { EnumPrimaryButton } from "../primary-button/primary-button.interface";
import { ImageComponent } from "../image/image.component";
import { CardStatus } from "./component/status/card-status.component";
import { CardInfo } from "./component/info/card-info.component";

export const Card = ({ image, name, price, isLoading, status, playersToPlay, playTime, handleRentGame }: ICard) => {
    const currency = formatCurrency(price);
    const { minimum, maximum } = playersToPlay || { minimum: '', maximum: '' }; // Add a default value if playersToPlay is undefined
    return <div className="bg-white max-[350px]:w-[77.14%] w-[270px] h-[316px] max-[340px]:h-[366px] rounded-md shadow-cardShadow">
        <div className="relative w-full bg-secondary h-[54%] z-10 leading-5 rounded-t-md">
            <CardStatus status={status} />
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30 z-20 rounded-t-md"></div>
            <ImageComponent image={image} alt={name} className="rounded-t-md" />
            <p className="absolute bottom-4 left-4 font-black text-xl z-20 text-white shadow-cardName drop-shadow-4xl break-words">{name}</p>
        </div>

        <CardInfo maximumPlayers={maximum} minimumPlayers={minimum} playTime={playTime} />

        {/* currency */}
        <div className="relative w-full flex flex-col gap-3 mt-3 items-start px-4 h-[46%]">
            <h5 className="text-2xl font-black text-primary tracking-[.08rem]">{currency}</h5>
            {
                EnumCardStatus.AVAILABLE === status &&
                <div className="w-full"><PrimaryButton loadingSize={20} isLoading={isLoading} handleClick={handleRentGame} text="alugar" type={EnumPrimaryButton.OUTLINED} /></div>
            }
        </div>
    </div>
};