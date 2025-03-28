import { LoadingHexagon } from "../loading-hexagon/loading-hexagon.component";
import { LoadingSpinner } from "../loading-spinner/loading-spinner.component";

export const LoadingScreenHexagon = () => (
  <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
    <LoadingHexagon />
  </div>
);

export const LoadingScreenSpinner = ({ size = 150 }: { size: number }) => (
  <div className="flex justify-center items-center w-full h-[calc(100vh-80px)]">
    <LoadingSpinner size={size} />
  </div>
);
