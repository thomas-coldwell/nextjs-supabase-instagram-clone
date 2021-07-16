import { User } from "@prisma/client";
import Image from "next/image";
import useResponsive from "../../../utils/useResponsive";
import { Avatar } from "./Avatar";
import { CounterRow } from "./CounterRow";
import { ActionButton } from "./ActionButton";
import { Details } from "./Name";

export type UserProfileDetails = Pick<
  User,
  "firstName" | "lastName" | "username" | "profilePicture" | "id"
> & { _count: { followers: number; followings: number; posts: number } };

interface IProfileDetails {
  user: UserProfileDetails;
}

export const ProfileDetails = ({ user }: IProfileDetails) => {
  //

  const { isMobile, isSmallMobile } = useResponsive();

  return (
    <div className="w-full">
      {isMobile || isSmallMobile ? (
        <>
          <div className="flex flex-row items-center w-full my-4">
            <Avatar {...user} />
            <CounterRow {...user} />
          </div>
          <Details {...user} />
          <ActionButton {...user} />
        </>
      ) : (
        <div className="flex flex-row items-center justify-between w-full my-4">
          <Avatar {...user} />
          <div className="flex flex-row flex-1">
            <div className="flex flex-col justify-start">
              <Details {...user} />
              <ActionButton {...user} />
            </div>
            <CounterRow {...user} />
          </div>
        </div>
      )}
    </div>
  );
};
