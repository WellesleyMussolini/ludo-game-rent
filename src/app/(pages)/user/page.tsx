import { ErrorMessage } from "@/app/components/error-message/error-message.component";

export default function User() {
    return <div className="flex justify-center items-center h-[calc(100vh-80px)]">
        <ErrorMessage title="IN DEVELOPMENT" message="WE'RE STILL WORKING ON IT YET" />
    </div>
};