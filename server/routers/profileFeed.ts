/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */

import { createRouter } from "../../server/createRouter";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { supabase } from "../../lib/supabase";

export const profileFeedRouter = createRouter().query("all", {
  input: z.object({ username: z.string() }),
  async resolve({ ctx, input: { username } }) {
    const posts = await ctx.prisma.post.findMany({
      where: { author: { username } },
      include: { author: true, likes: true, comments: true },
      orderBy: [{ createdAt: "desc" }],
    });
    if (!posts) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `No posts with username '${username}'`,
      });
    }
    return posts;
  },
});
