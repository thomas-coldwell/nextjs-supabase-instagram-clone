/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */

import { createRouter } from "../../server/createRouter";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const postRouter = createRouter()
  .query("byId", {
    input: z.object({ id: z.string() }),
    async resolve({ ctx, input }) {
      const post = await ctx.prisma.post.findUnique({
        where: { id: parseInt(input.id) },
      });
      if (!post) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No post with id '${input}'`,
        });
      }
      return post;
    },
  })
  .mutation("add", {
    input: z.object({
      images: z.array(z.string()),
      caption: z.string(),
      authorId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const post = await ctx.prisma.post.create({ data: input });
      return post;
    },
  });
