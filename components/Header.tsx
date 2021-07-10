import InstagramLogo from "../public/instagram.svg";
import Link from "next/link";
import Image from "next/image";
import { MdFavoriteBorder } from "react-icons/md";
import { Button } from "./Button";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/router";

export const Header = () => {
  //
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/auth");
  };

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
        <button
          className="flex items-center justify-center w-20 h-10 font-semibold text-white bg-blue-500 rounded-md"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};
