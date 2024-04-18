import { StaticImageData } from "next/image";

export interface IImage {
    image: string | StaticImageData,
    alt: string,
    className?: string,
    width?: string,
    height?: string,
    enableOpacity?: boolean,
    layoutType?: string | "fill" 
};