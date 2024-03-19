import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IAlert } from "./alert.interface";

export const Alert = ({ message, type, visibility }: IAlert) => {
    toast[type](message, { toastId: "alert" });
    return <>
        {visibility &&
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="colored"
                transition={Bounce}
                className="z-50"
            />
        }
    </>
};