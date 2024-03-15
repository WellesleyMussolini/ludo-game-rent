import { IActionButtonForm } from "./action-button-form.interface";

export const ActionButtonForm = ({ children, positionX, onClickIcon }: IActionButtonForm) => (
    <div className={`z-10 absolute top-2 ${positionX} text-gray-500 hover:text-gray-600 cursor-pointer`} onClick={onClickIcon}><div onClick={onClickIcon}>{children}</div></div>
);