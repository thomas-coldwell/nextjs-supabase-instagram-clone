import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { useCurrentUser } from "../../data/queries/useCurrentUser";
import { supabase } from "../../lib/supabase";
import { DropdownOption } from "./DropdownOption";

export const Dropdown = () => {
  //
  const [menuVisible, setMenuVisible] = useState(false);

  const router = useRouter();

  const { data: user } = useCurrentUser();

  return (
    <div className="relative">
      <button onClick={() => setMenuVisible((vis) => !vis)}>
        <MdArrowDropDown className="w-8 h-8 text-gray-500" />
      </button>
      {menuVisible && (
        <div className="absolute right-0 mt-4 overflow-hidden rounded-md shadow">
          <DropdownOption
            text="My profile"
            onClick={() => {
              router.push(`/user/${user?.username}`);
            }}
          />
          <DropdownOption
            text="Logout"
            type="destructive"
            onClick={async () => {
              await supabase.auth.signOut();
              router.replace("/auth");
            }}
          />
        </div>
      )}
    </div>
  );
};
