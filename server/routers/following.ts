/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */

import { createRouter } from "../createRouter";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { authorization } from "../middleware/authorization";

export const followingRouter = createRouter()
  .middleware(authorization)
  .query("active", {
    input: z.object({ userId: z.string() }),
    async resolve({ ctx, input: { userId } }) {
      const follower = await ctx.prisma.follower.findFirst({
        where: { userId, followerId: ctx.user.id },
      });
      return follower;
    },
  })
  .mutation("create", {
    input: z.object({ userId: z.string() }),
    async resolve({ ctx, input: { userId } }) {
      const user = await ctx.prisma.follower.create({
        data: { followerId: ctx.user.id, userId },
      });
      return user;
    },
  })
  .mutation("delete", {
    input: z.object({ id: z.number() }),
    async resolve({ ctx, input: { id } }) {
      await ctx.prisma.follower.delete({
        where: { id },
      });
      return;
    },
  });
