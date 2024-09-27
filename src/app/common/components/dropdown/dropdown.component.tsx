import React from "react";

export const Dropdown = ({ visibility, styles, content }: { visibility: boolean, styles?: string, content: React.ReactNode }) => (
    <>
        {
            visibility
            &&
            <div className={`absolute right-0 ${styles} bg-white shadow-md py-2 px-2 z-20`}>
                {content}
            </div>
        }
    </>
);