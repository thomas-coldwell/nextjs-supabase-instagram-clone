/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */

import { createRouter } from "../../server/createRouter";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const feedRouter = createRouter().query("all", {
  input: z.object({ userId: z.string().nullish() }),
  async resolve({ ctx, input: { userId } }) {
    if (!userId) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: `userId must not be null`,
      });
    }
    const followings = await (
      await ctx.prisma.user
        .findFirst({ where: { id: userId } })
        .followings({ include: { user: true } })
    ).map((following) => following.user);
    const posts = await ctx.prisma.post.findMany({
      where: { author: { id: { in: followings.map((user) => user.id) } } },
      include: { author: true, likes: true },
      orderBy: [{ createdAt: "desc" }],
    });
    if (!posts) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `No posts with userId '${userId}'`,
      });
    }
    return posts;
  },
});
