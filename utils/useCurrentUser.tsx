import { supabase } from "../lib/supabase";
import { trpc } from "./trpc";

export const useCurrentUser = () => {
  const id = supabase.auth.user()?.id;
  return trpc.useQuery(["user.byId", { id }]);
};
