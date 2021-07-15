import { supabase } from "../../../lib/supabase";
import cn from "classnames";

interface IActionButtonProps {
  id: string;
  username: string;
}

export const ActionButton = ({ id, username }: IActionButtonProps) => {
  //
  const session = supabase.auth.session();
  const isPersonalProfile = session?.user?.id === id;

  return (
    <button
      className={cn(
        "w-full h-8 text-sm font-medium rounded md:w-32 text-white",
        isPersonalProfile ? "text-gray-600 border-2" : "bg-blue-500"
      )}
    >
      {isPersonalProfile ? "Edit profile" : `Follow ${username}`}
    </button>
  );
};
