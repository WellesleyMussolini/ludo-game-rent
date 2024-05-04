import { LoadingSpinner } from "../loading-spinner/loading-spinner.component";

export const Loading = () => (
  <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
    <LoadingSpinner size={100} />
  </div>
);
