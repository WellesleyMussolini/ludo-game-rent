import { UserPicture } from "./components/user-picture.component";

export const UserProfileCard = ({
  name,
  email,
  image,
}: {
  name: string | undefined;
  email: string | undefined;
  image: string | undefined;
}) => {
  return (
    <div className="max-[200px]:w-[90%] max-w-72 flex items-center flex-col bg-white shadow-xl rounded-lg p-6 border border-gray-200">
      <UserPicture userName={name} userImage={image} />
      <div className="text-center mt-4 break-words">
        <p
          className="
      text-[clamp(10px,2.5vw+0.5rem,1.25rem)]
      font-semibold 
      "
        >
          {name}
        </p>
        <p
          className="
      text-[clamp(10px,2.5vw+0.5rem,1.25rem)]
      text-gray-600
    "
        >
          {email}
        </p>
      </div>
    </div>
  );
};
