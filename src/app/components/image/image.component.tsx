import Image from "next/image";
import { IImage } from "./image.interface";

export const ImageComponent = ({ image, alt, className, width, height, enableOpacity, layoutType }: IImage) => (
    <div className="relative" style={{ height: height, width: width }}>
        {enableOpacity && <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30 z-10 rounded-t-md"></div>}
        <Image
            src={image}
            alt={alt}
            layout={layoutType}
            width={0}
            height={0}
            objectFit='cover'
            className={`w-full h-full bg-center object-cover overflow-hidden select-none touch-none ${className}`}
        />
    </div>
);