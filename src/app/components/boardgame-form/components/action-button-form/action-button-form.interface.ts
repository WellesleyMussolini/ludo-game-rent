import React from "react";

export interface IActionButtonForm {
    children: React.ReactNode | React.ReactNode[],
    onClickIcon: () => void,
    positionX: string,
};