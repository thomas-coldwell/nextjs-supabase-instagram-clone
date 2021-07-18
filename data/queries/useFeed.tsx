import { Post, User } from "@prisma/client";
import { useQuery } from "react-query";
import { baseUrl } from "../../lib/auth";
import { supabase } from "../../lib/supabase";
import { handleFetchError } from "../handleFetchError";

export const useFeed = () => {
  return useQuery("feed", async () => {
    const user = supabase.auth.user();
    if (user) {
      const response = await fetch(`${baseUrl}/api/feed?userId=${user.id}`);
      if (response.ok) {
        const posts = (await response.json()) as (Post & {
          author: User;
        })[];
        return posts;
      } else {
        await handleFetchError(response);
      }
    } else {
      throw new Error("You are not logged in");
    }
  });
};
