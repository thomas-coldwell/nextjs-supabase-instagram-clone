/**
 * This file contains the root router of your tRPC-backend
 */
import { TRPCError } from "@trpc/server";
import superjson from "superjson";
import { createRouter } from "../createRouter";
import { feedRouter } from "./feed";
import { followingRouter } from "./following";
import { likeRouter } from "./like";
import { postRouter } from "./post";
import { profileFeedRouter } from "./profileFeed";
import { userRouter } from "./user";

/**
 * Create your application's root router
 * If you want to use SSG, you need export this
 * @link https://trpc.io/docs/ssg
 * @link https://trpc.io/docs/router
 */
export const appRouter = createRouter()
  /**
   * Add data transformers
   * @link https://trpc.io/docs/data-transformers
   */
  .transformer(superjson)
  .merge("post.", postRouter)
  .merge("user.", userRouter)
  .merge("profileFeed.", profileFeedRouter)
  .merge("feed.", feedRouter)
  .merge("like.", likeRouter)
  .merge("following.", followingRouter);

export type AppRouter = typeof appRouter;
