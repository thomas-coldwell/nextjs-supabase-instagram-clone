import { Follower } from "@prisma/client";
import { useMutation, useQueryClient } from "react-query";
import { baseUrl } from "../../lib/auth";
import { supabase } from "../../lib/supabase";
import { handleFetchError } from "../handleFetchError";

export const useDeleteFollowing = (id: number | undefined) => {
  const queryClient = useQueryClient();
  return useMutation(
    async () => {
      if (id) {
        const currentUser = supabase.auth.user();
        if (currentUser) {
          const response = await fetch(`${baseUrl}/api/follower?id=${id}`, {
            method: "DELETE",
          });
          if (response.ok) {
            return;
          } else {
            await handleFetchError(response);
          }
        } else {
          throw new Error("You are not logged in");
        }
      } else {
        throw new Error("No follow id specified");
      }
    },
    {
      onSuccess: () => {
        queryClient.setQueryData("following", undefined);
      },
    }
  );
};
