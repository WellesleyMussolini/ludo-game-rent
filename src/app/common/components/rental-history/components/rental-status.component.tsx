import { RentalStatus as RentalStatusType } from "@/app/common/types/rental.types";
import { translateStatus } from "../utils/translate-status";
import { FaPen } from "react-icons/fa";

export const RentalStatus = ({
  status,
  handleUpdateStatus,
}: {
  status: RentalStatusType;
  handleUpdateStatus: () => void;
}) => {
  return (
    <p className="text-center flex justify-center items-center gap-1 xs:gap-2 rounded-md">
      <span className="relative flex h-1 w-1 xs:h-2 xs:w-2 sm:w-3 sm:h-3">
        <span
          className={`${
            status === RentalStatusType.RETURNED && "hidden"
          } animate-ping absolute inline-flex h-full w-full rounded-full
                      ${status === RentalStatusType.ACTIVE && "bg-green-500"}
                      ${status === RentalStatusType.OVERDUE && "bg-error"}
                      opacity-75`}
        />
        <span
          className={`${
            status === RentalStatusType.RETURNED && "hidden"
          } relative inline-flex rounded-full h-1 w-1 xs:h-2 xs:w-2 sm:w-3 sm:h-3
                ${status === RentalStatusType.ACTIVE && "bg-green-500"}
                ${status === RentalStatusType.OVERDUE && "bg-error"}
                `}
        ></span>
      </span>
      <p
        className={`max-[240px]:text-[4px] max-[375px]:text-[5px] max-[475px]:text-[6px] max-[575px]:text-[8px] text-[10px] md:text-xs lg:text-sm xl:text-base 2xl:text-lg
                         ${
                           status === RentalStatusType.ACTIVE &&
                           "text-green-500"
                         }
                         ${status === RentalStatusType.OVERDUE && "text-error"}
                         ${
                           status === RentalStatusType.RETURNED &&
                           "text-gray-500 font-semibold"
                         }`}
      >
        {translateStatus(status)}
      </p>
      {(status === RentalStatusType.OVERDUE ||
        status === RentalStatusType.ACTIVE) && (
        <FaPen
          onClick={handleUpdateStatus}
          className="max-[300px]:text-[8px] max-xs:text-xs xs:text-sm sm:text-base text-gray-500 cursor-pointer transform scale-125 duration-300"
        />
      )}
    </p>
  );
};
