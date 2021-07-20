import { Post, PostLike, Prisma } from "@prisma/client";
import { useMutation, useQueryClient } from "react-query";
import { baseUrl } from "../../lib/auth";
import { supabase } from "../../lib/supabase";
import { handleFetchError } from "../handleFetchError";

type Payload = {
  userId: string;
  postId: number;
};

export const useAddPostLike = () => {
  return useMutation(async (payload: Payload) => {
    const currentUser = supabase.auth.user();
    if (currentUser) {
      const response = await fetch(`${baseUrl}/api/likes`, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        return;
      } else {
        await handleFetchError(response);
      }
    } else {
      throw new Error("You are not logged in");
    }
  });
};
