import Image from "next/image";

export const TableCardImage = ({image, alt}: {image: string, alt: string}) => (
    <div className="flex-shrink-0 mr-3">
        <Image
            src={image}
            alt={alt}
            height={45}
            width={45}
            className="rounded-full"
        />
    </div>
);