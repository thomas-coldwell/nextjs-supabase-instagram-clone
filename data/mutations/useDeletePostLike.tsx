import { Follower } from "@prisma/client";
import { useMutation, useQueryClient } from "react-query";
import { baseUrl } from "../../lib/auth";
import { supabase } from "../../lib/supabase";
import { handleFetchError } from "../handleFetchError";

type Params = { postId: number; userId: string };

export const useDeletePostLike = () => {
  return useMutation(async (params: Params) => {
    if (params) {
      const currentUser = supabase.auth.user();
      if (currentUser) {
        const response = await fetch(
          `${baseUrl}/api/likes?postId=${params.postId}&userId=${params.userId}`,
          {
            method: "DELETE",
          }
        );
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
  });
};
