import InstagramLogo from "../public/instagram.svg";
import Link from "next/link";
import Image from "next/image";
import { MdFavoriteBorder } from "react-icons/md";
import { Button } from "./Button";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/router";
import { useCurrentUser } from "../data/queries/useCurrentUser";
import { useMemo } from "react";

export const Header = () => {
  //
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/auth");
  };

  const { data: user } = useCurrentUser();

  return (
    <div className="flex flex-row items-center justify-between w-full h-24">
      <Link href="/">
        <a>
          <Image
            src={InstagramLogo}
            alt="Instagram logo | Home"
            className="object-contain"
            height={50}
            width={140}
          />
        </a>
      </Link>
      <div className="flex flex-row items-center">
        <Link href="/likes">
          <a>
            <MdFavoriteBorder className="w-8 h-8 mr-4 text-gray-600" />
          </a>
        </Link>
        <Link href={`/user/${user?.username}`}>
          <a className="relative w-10 h-10 overflow-hidden bg-gray-300 rounded-full">
            {user && (
              <Image
                src={user.profilePicture}
                className="w-full h-full"
                alt={`${user?.firstName} ${user?.lastName}`}
                layout="fill"
              />
            )}
          </a>
        </Link>
      </div>
    </div>
  );
};
