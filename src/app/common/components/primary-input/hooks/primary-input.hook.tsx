import { sizeIcons } from "@/app/common/constants/size-icons";
import { FaCalendar } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { preventStringOnInputNumber } from "../utils/prevent-string-on-input-number";

export const usePrimaryInput = () => {
  const inputIcons = {
    searchGlass: (handleOnSearch: React.MouseEventHandler<HTMLDivElement>) => (
      <div
        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
        onClick={handleOnSearch}
      >
        <IoSearchSharp className="text-gray-500 mr-2" size={sizeIcons.medium} />
      </div>
    ),
    calendar: () => (
      <FaCalendar className="text-gray-500" size={sizeIcons.small} />
    ),
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) =>
    preventStringOnInputNumber(event);

  return { inputIcons, handleKeyDown };
};
