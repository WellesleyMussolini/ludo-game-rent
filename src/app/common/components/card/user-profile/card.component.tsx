import { useSession } from "next-auth/react";
import { FaCircleUser } from "react-icons/fa6";
import Image from "next/image";

export const UserProfileCard = ({
  data,
}: {
  data: {
    name: string | undefined;
    email: string | undefined;
    image: string | undefined;
  };
}) => {
  const { status } = useSession();
  const isLoading = status === "loading";
  const authenticated = status === "authenticated";
  return (
    <div className="max-[200px]:w-[90%] max-w-72 flex items-center flex-col bg-white shadow-xl rounded-lg p-6 border border-gray-200">
      {isLoading || !authenticated ? (
        <FaCircleUser className="text-gray-400 animate-pulse" size={80} />
      ) : (
        <div className="flex flex-col justify-center items-center cursor-pointer">
          <Image
            src={data.image ?? ""}
            alt={data.name ?? ""}
            className="rounded-full"
            height={80}
            width={80}
          />
        </div>
      )}
      <div className="text-center mt-4 break-words">
        <p className="text-[clamp(10px,2.5vw+0.5rem,1.25rem)] font-semibold">
          {data.name}
        </p>
        <p className="text-[clamp(10px,2.5vw+0.5rem,1.25rem)] text-gray-600">
          {data.email}
        </p>
      </div>
    </div>
  );
};
