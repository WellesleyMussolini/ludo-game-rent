import { useContext } from "@/context/context";
import { BsFillHandbagFill } from "react-icons/bs";
import { ICartIcon } from "./cart-icon.interface";

export const CartIcon = ({ iconSize, onClick }: ICartIcon) => {
    const { cart } = useContext();
    return (
        <div className={`
            ${!cart.length && "hidden"} 
            ${cart.length > 9 && "w-[70px]"} w-[64px] 
            relative 
            flex 
            items-end 
            justify-end 
            py-2 
            animate-jump-in 
            cursor-pointer 
            duration-300
        `} onClick={onClick}>
            <div className="bg-black rounded-full px-2 py-3">
                <BsFillHandbagFill color="#fff" className="w-[23px]" />
            </div>
            <span className={"absolute top-0 left-4 font-black text-white bg-secondary px-2 p-1 rounded-full text-[10px]"}>{cart.length}</span>
        </div>
    );
};

/*
        <div className={`
            ${!cart.length && "hidden"} 
            ${cart.length > 9 && "w-[70px]"} w-[64px] 
            relative 
            flex 
            items-end 
            justify-end 
            py-2 
            animate-jump-in 
            cursor-pointer 
            duration-300
        `} onClick={onClick}>
            <div className="bg-black rounded-full p-3">
                <BsFillHandbagFill color="#fff" size={23} />
            </div>
            <span className={"absolute top-0 left-0 font-black text-white bg-secondary px-3 p-1 rounded-full text-sm"}>{cart.length}</span>
        </div>
*/