import React from "react";

type AlertPingProps = {
  isActive?: boolean;
};

function AlertPing({ isActive }: AlertPingProps) {
  return (
    <span className="relative flex h-2.5 w-2.5">
      <span
        className={`opacity-75 animate-ping absolute inline-flex h-full w-full rounded-full ${
          isActive ? "bg-green-500" : "bg-error"
        }`}
      />
      <span
        className={`opacity-75 relative inline-flex rounded-full h-2.5 w-2.5 ${
          isActive ? "bg-green-500" : "bg-error"
        }`}
      />
    </span>
  );
}

export default AlertPing;
