/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */

import { createRouter } from "../../server/createRouter";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { authorization } from "../middleware/authorization";

export const feedRouter = createRouter()
  .middleware(authorization)
  .query("all", {
    async resolve({ ctx }) {
      const followings = await (
        await ctx.prisma.user
          .findFirst({ where: { id: ctx.user.id } })
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
          message: `No posts with userId '${ctx.user.id}'`,
        });
      }
      return posts;
    },
  });
