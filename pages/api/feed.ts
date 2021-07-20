// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Post, Prisma, User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    (Post & {
      author: User;
    })[]
  >
) {
  //

  const getPosts = async () => {
    const userId = req.query.userId;
    if (typeof userId === "string") {
      const followings = await (
        await prisma.user
          .findFirst({ where: { id: userId } })
          .followings({ include: { user: true } })
      ).map((following) => following.user);
      const posts = await prisma.post.findMany({
        where: { author: { id: { in: followings.map((user) => user.id) } } },
        include: { author: true },
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
