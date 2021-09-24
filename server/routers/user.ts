/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */

import { createRouter } from "../../server/createRouter";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { supabase } from "../../lib/supabase";

export const userRouter = createRouter()
  .query("byId", {
    input: z.object({ id: z.string().nullish() }),
    async resolve({ ctx, input }) {
      if (!input.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `User ID must not be null`,
        });
      }
      const user = await ctx.prisma.user.findUnique({
        where: { id: input.id },
      });
      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No user with id '${input}'`,
        });
      }
      user.profilePicture =
        supabase.storage.from("avatars").getPublicUrl(user.profilePicture)
          .publicURL ?? "";
      return user;
    },
  })
  .mutation("add", {
    input: z.object({
      id: z.string(),
      email: z.string(),
      firstName: z.string(),
      lastName: z.string(),
      username: z.string(),
      profilePicture: z.string(),
    }),
    async resolve({ ctx, input }) {
      const user = await ctx.prisma.user.create({ data: input });
      return user;
    },
  });
