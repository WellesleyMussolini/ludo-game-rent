"use server";

import { GetStartedComponent } from "@/app/(customer)/(pages)/get-started/components/get-started.component";

export default async function GetStarted() {
  return (
    <div className="flex justify-center items-center h-screen">
      <GetStartedComponent />
    </div>
  );
}
