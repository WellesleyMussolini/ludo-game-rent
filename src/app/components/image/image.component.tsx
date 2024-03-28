import Image from "next/image";
import { IImage } from "./image.interface";

export const ImageComponent = ({ image, alt, className }: IImage) => <Image
    src={image}
    alt={alt}
    layout='fill'
    objectFit='cover'
    className={`w-full h-full bg-center object-cover overflow-hidden select-none touch-none ${className}`}
/>