import { useContext } from "@/context/context";
import { BsFillHandbagFill } from "react-icons/bs";

export const CartIcon = ({ onClick }: { onClick: () => void }) => {
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
            <div className="bg-black rounded-full p-3">
                <BsFillHandbagFill color="#fff" size={23} />
            </div>
            <span className={"absolute top-0 left-0 font-black text-white bg-secondary px-3 p-1 rounded-full text-sm"}>{cart.length}</span>
        </div>
    );
};