import { EnumPrimaryInputStyle, EnumPrimaryInputType, IPrimaryInput } from "./primary-input.interface";

export const PrimaryInput = ({ text, type, style, placeholder, value, id, htmlFor, handleOnChange }: IPrimaryInput) => (
    <>
        {
            style === EnumPrimaryInputStyle.PRIMARY ?
                <div className="flex flex-col gap-2 w-full">
                    {text && <p>{text}</p>}
                    <input
                        // onChange={(event) => handleOnChange(event.target.value)}
                        onChange={handleOnChange}
                        type={type} placeholder={placeholder}
                        className={`${type === EnumPrimaryInputType.PASSWORD && "tracking-[.2em]"} text-base border-2 outline-none rounded-[0.5rem] w-full inline-flex items-center justify-center gap-3 py-2 px-3 bg-[#F9FAFB] focus:border-primary`}
                        value={value}
                    />
                </div>
                :
                <div className="relative group flex flex-col gap-1 h-10 w-full">
                    <input id={id} type={type} required className="w-full h-full peer border-b-2 outline-none border-opacity-45 border-primary focus:border-opacity-100"
                        // onChange={(event) => handleOnChange(event.target.value)}
                        onChange={handleOnChange}
                        value={value}
                    />
                    <label htmlFor={htmlFor} className="cursor-text transform transition-all duration-300 ease-in-out text-gray-400 absolute top-0 left-0 h-full flex items-center group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0">{text}</label>
                </div>
        }
    </>
);