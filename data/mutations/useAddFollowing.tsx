import { Follower } from "@prisma/client";
import { useMutation, useQueryClient } from "react-query";
import { baseUrl } from "../../lib/auth";
import { supabase } from "../../lib/supabase";
import { handleFetchError } from "../handleFetchError";

export const useAddFollowing = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    async () => {
      const currentUser = supabase.auth.user();
      if (currentUser) {
        const response = await fetch(`${baseUrl}/api/follower`, {
          method: "POST",
          body: JSON.stringify({
            userId: userId,
            followerId: currentUser.id,
          }),
        });
        if (response.ok) {
          const follower = (await response.json()) as Follower;
          // Replace the ref to the profile picture with the public avatar url
          return follower;
        } else {
          await handleFetchError(response);
        }
      } else {
        throw new Error("You are not logged in");
      }
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData("following", data);
      },
    }
  );
};
