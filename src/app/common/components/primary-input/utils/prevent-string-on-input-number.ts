import React from "react";

export const preventStringOnInputNumber = (
  event: React.KeyboardEvent<HTMLInputElement>
) => {
  const blockedKeys = ["e", "+", "-", ".", ",", "E"];

  if (blockedKeys.includes(event.key)) {
    event.preventDefault();
  }
};
