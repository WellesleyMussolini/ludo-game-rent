import React from "react";
import { boardGamesService } from "@/app/common/services/boardgames.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

export const useBoardGameCatalogue = () => {
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams()!;
  const boardgameIdParam = searchParams.get("search");

  const {
    data: boardgames,
    isPending: isLoading,
    isError: boardgamesFetchError,
  } = useQuery({
    queryKey: ["search", boardgameIdParam],
    queryFn: async () => {
      if (boardgameIdParam) {
        const searchQueryParam = boardgameIdParam.replace(/-/g, " ");
        return await boardGamesService.getByName(searchQueryParam);
      }
      return await boardGamesService.get();
    },
  });

  const boardgameNotFound = boardgameIdParam && boardgames?.length === 0;

  // Handle search input
  const handleSearch = async (): Promise<void> => {
    const searchUrl = searchQuery.replace(/\s+/g, "-").toLowerCase();
    const url = `?search=${searchUrl}`;
    router.push(url);
  };

  return {
    searchQuery,
    handleSearch,
    setSearchQuery,
    boardgames,
    isLoading,
    boardgamesFetchError,
    boardgameNotFound,
  };
};
