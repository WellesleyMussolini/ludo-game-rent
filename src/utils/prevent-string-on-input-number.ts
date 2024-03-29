import React from "react";

export const preventStringOnInputNumber = (
  event: React.KeyboardEvent<HTMLInputElement>
) => {
  const keyCode = event.keyCode || event.which;
  const blockedKeys = [69, 109, 107, 194];
  console.log(event.keyCode);
  if (blockedKeys.includes(keyCode)) return event.preventDefault();
};