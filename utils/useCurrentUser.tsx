import { supabase } from "../lib/supabase";
import { trpc } from "./trpc";

export const useCurrentUser = () => {
  return trpc.useQuery(["user.byId", { id: supabase.auth.user()?.id }]);
};
