import React from "react";
import { boardGamesService } from "@/app/common/services/boardgames.service";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useBoardGameCatalogue = () => {
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams()!;
  const boardgameIdParam = searchParams.get("boardgame");
  const { data: boardgames, isPending: isLoading } = useQuery({
    queryKey: ["boardgames", boardgameIdParam],
    queryFn: async () => {
      if (boardgameIdParam) {
        const searchQueryParam = boardgameIdParam.replace(/-/g, " ");
        return await boardGamesService.getByName(searchQueryParam);
      }
      return await boardGamesService.get();
    },
  });

  // Handle search input
  const handleSearch = async (): Promise<void> => {
    const searchUrl = searchQuery.replace(/\s+/g, "-").toLowerCase();
    const url = `?boardgame=${searchUrl}`;
    router.push(url);
  };

  return {
    searchQuery,
    pathname,
    handleSearch,
    setSearchQuery,
    boardgames,
    isLoading,
  };
};
