import React from "react";
import { EnumAlert, IAlert } from "./alert.interface";
import { BiSolidLike, BiSolidBell } from "react-icons/bi";
import { IoMdClose, IoIosWarning } from "react-icons/io";

export const Alert = ({ visibility, text, type, handleAlertVisibility }: IAlert) => {
    const [hidden, setHidden] = React.useState<string>("animate-showAlert");

    const hideAlert = () => {
        setHidden("animate-hideAlert")
        setTimeout(() => { 
            handleAlertVisibility(false);
            setHidden("animate-showAlert")
        }, 1000);
    };
    return (
        <>
            {
                visibility &&
                <div className={`
                ${type === EnumAlert.DEFAULT && "bg-secondary"} 
                ${type === EnumAlert.SUCCESSFUL && "bg-green-500"} 
                ${type === EnumAlert.WARNING && "bg-yellow-500"} 
                ${type === EnumAlert.ERROR && "bg-red-500"} 
                text-white rounded
                py-6 
                min-w-[22em]
                flex
                items-center
                justify-center
                gap-5
                px-8
                z-50
                fixed
                left-8
                top-20
                ${hidden}
            `}>
                    <div>
                        {type === EnumAlert.DEFAULT && <BiSolidBell size={27} color="white" />}
                        {type === EnumAlert.SUCCESSFUL && <BiSolidLike size={27} color="white" />}
                        {type === EnumAlert.WARNING && <IoIosWarning size={27} color="white" />}
                        {type === EnumAlert.ERROR && <IoIosWarning size={27} color="white" />}
                    </div>
                    <p className="text-base">{text}</p>
                    <IoMdClose onClick={hideAlert} size={26} className="text-gray-100 hover:text-white duration-300 ease-out cursor-pointer" />
                </div>
            }
        </>
    );
};