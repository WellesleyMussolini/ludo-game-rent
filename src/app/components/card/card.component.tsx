import Image from "next/image";

export const Card = ({ image }: { image: string }) => <Image
    src={image}
    alt={"games"} width={0} height={0}
    layout='fill'
    objectFit='cover'
    className="w-full h-full bg-center object-cover overflow-hidden select-none touch-none
    "
/>