import { supabase } from "../../../lib/supabase";
import cn from "classnames";
import { trpc } from "../../../utils/trpc";

interface IActionButtonProps {
  id: string;
  username: string;
}

export const ActionButton = ({ id, username }: IActionButtonProps) => {
  //
  const session = supabase.auth.session();
  const isPersonalProfile = session?.user?.id === id;

  const { data: following, refetch: refetchFollowing } = trpc.useQuery(
    [
      "following.active",
      { userId: id, followerId: supabase.auth.user()?.id ?? "" },
    ],
    { enabled: !isPersonalProfile }
  );
  const { mutateAsync: addFollowing, isLoading: isAddingFollowing } =
    trpc.useMutation("following.create", {
      onSuccess: (data) => {
        refetchFollowing();
      },
    });
  const { mutateAsync: deleteFollowing, isLoading: isDeletingFollowing } =
    trpc.useMutation("following.delete", {
      onSuccess: () => {
        refetchFollowing();
      },
    });

  const handleClick = async () => {
    if (isPersonalProfile) {
    } else {
      if (following) {
        await deleteFollowing({ id: following.id });
      } else {
        await addFollowing({
          followerId: supabase.auth.user()?.id,
          userId: id,
        });
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
