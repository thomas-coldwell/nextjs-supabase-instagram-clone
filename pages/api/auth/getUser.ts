// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { User } from "@supabase/supabase-js";
import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../lib/supabase";

type Data = {
  error?: string;
  user?: User;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const token = req.headers.token;
  if (typeof token !== "string") {
    return res.status(401).json({ error: "No token" });
  }
  const { data: user, error } = await supabase.auth.api.getUser(token);
  if (error) return res.status(401).json({ error: error.message });
  if (!user) return res.status(404).json({ error: "User not found" });
  return res.status(200).json({ user });
}
