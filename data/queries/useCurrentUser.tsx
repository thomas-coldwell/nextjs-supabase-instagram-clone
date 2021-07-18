import { User } from "@prisma/client";
import { useQuery } from "react-query";
import { baseUrl } from "../../lib/auth";
import { supabase } from "../../lib/supabase";
import { handleFetchError } from "../handleFetchError";

export const useCurrentUser = () => {
  return useQuery("currentUser", async () => {
    const user = supabase.auth.user();
    if (user) {
      const response = await fetch(`${baseUrl}/api/user?id=${user.id}`);
      if (response.ok) {
        const user = (await response.json()) as User;
        // Replace the ref to the profile picture with the public avatar url
        user.profilePicture =
          supabase.storage.from("avatars").getPublicUrl(user.profilePicture)
            .publicURL ?? "";
        return user;
      } else {
        await handleFetchError(response);
      }
    } else {
      throw new Error("You are not logged in");
    }
  });
};
