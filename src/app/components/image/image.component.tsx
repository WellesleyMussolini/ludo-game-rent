import Image from "next/image";
import { IImage } from "./image.interface";

export const ImageComponent = ({ image, alt, className, width, height, enableOpacity }: IImage) => (
    <div className="relative" style={{ height: height, width: width }}>
        {enableOpacity && <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30 z-10"></div>}
        <Image
            src={image}
            alt={alt}
            layout='fill'
            objectFit='cover'
            className={`w-full h-full bg-center object-cover overflow-hidden select-none touch-none ${className}`}
        />
    </div>
);