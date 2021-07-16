import { Post, Prisma } from "@prisma/client";
import { useMutation, useQueryClient } from "react-query";
import { baseUrl } from "../../lib/auth";
import { supabase } from "../../lib/supabase";
import { handleFetchError } from "../handleFetchError";

type Payload = {
  images: string[];
  caption: string;
  authorId: string;
};

export const useAddPost = () => {
  return useMutation(async (payload: Payload) => {
    const currentUser = supabase.auth.user();
    if (currentUser) {
      const response = await fetch(`${baseUrl}/api/post`, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        const post = (await response.json()) as Post;
        return post;
      } else {
        await handleFetchError(response);
      }
    } else {
      throw new Error("You are not logged in");
    }
  });
};
