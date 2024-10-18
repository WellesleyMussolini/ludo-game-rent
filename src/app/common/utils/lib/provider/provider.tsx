"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface ProviderProps {
  children: string | JSX.Element | JSX.Element[] | React.ReactNode;
}

export const queryClient = new QueryClient();

export const Provider = ({ children }: ProviderProps) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        {children}
      </QueryClientProvider>
    </SessionProvider>
  );
};
