import { EnumPrimaryInput, IPrimaryInput } from "./primary-input.interface";

export const PrimaryInput = ({ text, type, placeholder }: IPrimaryInput) => (
    <div className="flex flex-col gap-2">
        <p>{text}</p>
        <input
            type={type} placeholder={placeholder}
            className={`${type === EnumPrimaryInput.PASSWORD && "tracking-[.2em]"} text-base border-2 outline-none rounded-[0.5rem] w-full inline-flex items-center justify-center gap-3 py-2 px-3 bg-[#F9FAFB] focus:border-primary`}
        />
    </div>
);