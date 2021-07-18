import { Follower, User } from "@prisma/client";
import { useQuery } from "react-query";
import { baseUrl } from "../../lib/auth";
import { supabase } from "../../lib/supabase";
import { handleFetchError } from "../handleFetchError";

export const useFollowing = (userId: string) => {
  return useQuery("following", async () => {
    const currentUser = supabase.auth.user();
    if (currentUser) {
      const response = await fetch(
        `${baseUrl}/api/follower?userId=${userId}&followerId=${currentUser.id}`
      );
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
  });
};
