// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Post, PostComment, PostLike, Prisma, User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    (Post & {
      author: User;
      likes: PostLike[];
      comments: PostComment[];
    })[]
  >
) {
  //

  const getPosts = async () => {
    const username = req.query.username;
    if (typeof username === "string") {
      const posts = await prisma.post.findMany({
        where: { author: { username: username } },
        include: { author: true, likes: true, comments: true },
        orderBy: [{ createdAt: "desc" }],
      });
      if (posts) {
        return res.status(200).json(posts);
      } else {
        res.status(404).end(`No posts found`);
      }
    } else {
      return res.status(400).end("id query param not present");
    }
  };

  switch (req.method) {
    case "GET":
      return getPosts();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
