/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */

import { createRouter } from "../createRouter";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const likeRouter = createRouter()
  .mutation("create", {
    input: z.object({ userId: z.string().nullish(), postId: z.number() }),
    async resolve({ ctx, input: { userId, postId } }) {
      if (!userId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "userId is required",
        });
      }
      const like = await ctx.prisma.postLike.create({
        data: { userId, postId },
      });
      return like;
    },
  })
  .mutation("delete", {
    input: z.object({ userId: z.string().nullish(), postId: z.number() }),
    async resolve({ ctx, input: { userId, postId } }) {
      if (!userId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "userId is required",
        });
      }
      await ctx.prisma.postLike.deleteMany({
        where: { userId, postId },
      });
      return;
    },
  });
