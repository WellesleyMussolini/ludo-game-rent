import { queryClient } from "../utils/lib/provider/provider";

export const useRefetchQuery = () => {
  const handleResetQuery = (querieKey: string) => {
    queryClient.resetQueries({
      queryKey: [querieKey],
    });
  };

  const handleInvalidateQuery = (querieKey: string) => {
    queryClient.invalidateQueries({
      queryKey: [querieKey],
    });
  };

  return {
    handleResetQuery,
    handleInvalidateQuery,
  };
};
