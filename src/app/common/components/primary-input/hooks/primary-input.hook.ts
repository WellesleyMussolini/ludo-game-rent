import { usePathname, useRouter } from "next/navigation";
import { PrimaryInputTypes } from "../primary-input.types";
import { preventStringOnInputNumber } from "../utils/prevent-string-on-input-number";
import { Pathnames } from "@/app/common/types/pathnames.enum";
import React from "react";

export const usePrimaryInput = (
  type: PrimaryInputTypes,
  handleOnChange: (searchQuery: string) => void
) => {
  const router = useRouter();
  const pathname = usePathname();
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (type === PrimaryInputTypes.NUMBER)
      return preventStringOnInputNumber(event);
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (value === "") {
      handleOnChange("");
      router.push(
        pathname === Pathnames.HOME ? Pathnames.HOME : Pathnames.ADMIN
      );
    }

    handleOnChange(value);
  };

  return { handleInput, handleKeyDown };
};
