import Image from "next/image";

interface IAvatarProps {
  profilePicture: string;
  firstName: string;
  lastName: string;
}

export const Avatar = ({
  profilePicture,
  firstName,
  lastName,
}: IAvatarProps) => {
  return (
    <div className="relative w-20 h-20 ml-2 mr-6 overflow-hidden bg-gray-300 rounded-full md:ml-6 md:mr-10 md:w-36 md:h-36">
      <Image
        src={profilePicture}
        className="w-full h-full"
        alt={`${firstName} ${lastName}`}
        layout="fill"
      />
    </div>
  );
};
