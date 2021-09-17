import { supabase } from "../../../lib/supabase";
import cn from "classnames";
import { useFollowing } from "../../../data/queries/useFollowing";
import { useAddFollowing } from "../../../data/mutations/useAddFollowing";
import { useDeleteFollowing } from "../../../data/mutations/useDeleteFollowing";

interface IActionButtonProps {
  id: string;
  username: string;
}

export const ActionButton = ({ id, username }: IActionButtonProps) => {
  //
  const session = supabase.auth.session();
  const isPersonalProfile = session?.user?.id === id;

  const { data: following } = useFollowing(id, { enabled: !isPersonalProfile });
  const { mutateAsync: addFollowing, isLoading: isAddingFollowing } =
    useAddFollowing(id);
  const { mutateAsync: deleteFollowing, isLoading: isDeletingFollowing } =
    useDeleteFollowing(following?.id);

  const handleClick = async () => {
    if (isPersonalProfile) {
    } else {
      if (following) {
        await deleteFollowing();
      } else {
        await addFollowing();
      }
    }
  };

  const isDisabled = isAddingFollowing || isDeletingFollowing;

  return (
    <button
      className={cn(
        "w-full h-8 text-sm font-medium rounded md:w-32 text-white transition-all duration-500",
        isPersonalProfile
          ? "text-gray-600 border-2"
          : following
          ? "bg-red-400"
          : "bg-blue-500",
        isDisabled && "filter grayscale"
      )}
      disabled={isDisabled}
      onClick={handleClick}
    >
      {isPersonalProfile
        ? "Edit profile"
        : `${following ? "Unfollow" : "Follow"}`}
    </button>
  );
};
