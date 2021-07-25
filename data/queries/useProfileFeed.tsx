import { Post, PostComment, PostLike, User } from "@prisma/client";
import { useQuery } from "react-query";
import { baseUrl } from "../../lib/auth";
import { supabase } from "../../lib/supabase";
import { handleFetchError } from "../handleFetchError";

export const useProfileFeed = (username: string) => {
  return useQuery("profileFeed", async () => {
    const response = await fetch(
      `${baseUrl}/api/profileFeed?username=${username}`
    );
    if (response.ok) {
      const posts = (await response.json()) as (Post & {
        author: User;
        likes: PostLike[];
        comments: PostComment[];
      })[];
      return posts;
    } else {
      await handleFetchError(response);
    }
  });
};
