/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */

import { createRouter } from "../createRouter";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { authorization } from "../middleware/authorization";

export const likeRouter = createRouter()
  .middleware(authorization)
  .mutation("create", {
    input: z.object({ postId: z.number() }),
    async resolve({ ctx, input: { postId } }) {
      const like = await ctx.prisma.postLike.create({
        data: { userId: ctx.user.id, postId },
      });
      return like;
    },
  })
  .mutation("delete", {
    input: z.object({ postId: z.number() }),
    async resolve({ ctx, input: { postId } }) {
      await ctx.prisma.postLike.deleteMany({
        where: { userId: ctx.user.id, postId },
      });
      return;
    },
  });
