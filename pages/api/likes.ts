// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Post } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  //

  const createLike = async () => {
    try {
      const like = await prisma.postLike.create({ data: JSON.parse(req.body) });
      res.status(200).json(like);
    } catch (error) {
      res.status(400).end(error);
    }
  };

  const deleteLike = async () => {
    try {
      const postId = req.query.postId;
      const userId = req.query.userId;
      if (typeof postId === "string" && typeof userId === "string") {
        await prisma.postLike.deleteMany({
          where: { userId, postId: parseInt(postId) },
        });
        return res.status(200).end();
      } else {
        return res.status(404).end();
      }
    } catch (error) {
      res.status(400).end(error);
    }
  };

  switch (req.method) {
    case "POST":
      return createLike();
    case "DELETE":
      return deleteLike();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
