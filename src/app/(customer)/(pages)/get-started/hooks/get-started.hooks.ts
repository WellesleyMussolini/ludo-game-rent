"use client";

import React from "react";

export const useGetStarted = () => {
  const [cpf, setCpf] = React.useState<string>("");
  return { cpf, setCpf };
};
