import { User } from "@supabase/gotrue-js";
import { TRPCError } from "@trpc/server";
import { MiddlewareFunction } from "@trpc/server/dist/declarations/src/internals/middlewares";
import { Context } from "../context";

export const authorization: MiddlewareFunction<
  Context,
  Context & { user: User }
> = ({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user, // user value is known to be non-null now
    },
  });
};
