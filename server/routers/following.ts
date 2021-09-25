/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */

import { createRouter } from "../createRouter";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const followingRouter = createRouter()
  .query("active", {
    input: z.object({ followerId: z.string(), userId: z.string() }),
    async resolve({ ctx, input: { userId, followerId } }) {
      const follower = await ctx.prisma.follower.findFirst({
        where: { userId, followerId },
      });
      return follower;
    },
  })
  .mutation("create", {
    input: z.object({ followerId: z.string().nullish(), userId: z.string() }),
    async resolve({ ctx, input: { followerId, userId } }) {
      if (!followerId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "followerId is required",
        });
      }
      const user = await ctx.prisma.follower.create({
        data: { followerId, userId },
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
