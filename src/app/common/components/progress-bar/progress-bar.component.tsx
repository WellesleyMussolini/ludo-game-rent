"use client";
import React from "react";

import { AppProgressBar } from "next-nprogress-bar";

export function ProgressBar() {
  return (
    <AppProgressBar
      height="4px"
      color="#1cb36e"
      options={{ showSpinner: false, easing: "ease" }}
    />
  );
}
