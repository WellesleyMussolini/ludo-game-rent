export const CardSkeleton = () => (
  <div className="bg-white p-2 rounded-md shadow-lg flex flex-col gap-5 select-none w-full max-w-[260px] min-w-[200px] h-[320px]">
    <div className="h-full w-full rounded-xl bg-gray-200 animate-pulse" />
    <div className="flex w-full flex-col gap-3 p-2">
      <div className="bg-gray-200 w-full animate-pulse h-3 rounded-2xl" />
      <div className="bg-gray-200 w-full animate-pulse h-3 rounded-2xl" />
      <div className="bg-gray-200 w-full animate-pulse h-3 rounded-2xl" />
      <div className="bg-gray-200 w-full animate-pulse h-10 rounded-md" />
    </div>
  </div>
);
