import React from "react";

export const useIsLoading = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  return { isLoading, setIsLoading };
};
