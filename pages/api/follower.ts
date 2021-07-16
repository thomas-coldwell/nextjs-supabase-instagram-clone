// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Follower } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Follower>
) {
  //

  const getFollower = async () => {
    const userId = req.query.userId;
    const followerId = req.query.followerId;
    if (typeof userId === "string" && typeof followerId === "string") {
      const follower = await prisma.follower.findFirst({
        where: { userId, followerId },
      });
      if (follower) {
        return res.status(200).json(follower);
      } else {
        return res.status(404).end();
      }
    } else {
      return res.status(400).end();
    }
  };

  const createFollow = async () => {
    try {
      const user = await prisma.follower.create({ data: JSON.parse(req.body) });
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).end(error);
    }
  };

  const deleteFollow = async () => {
    try {
      const id = req.query.id;
      if (typeof id === "string") {
        await prisma.follower.delete({ where: { id: parseInt(id) } });
        return res.status(200).end();
      } else {
        return res.status(404).end();
      }
    } catch (error) {
      return res.status(400).end(error);
    }
  };

  switch (req.method) {
    case "GET":
      return getFollower();
    case "POST":
      return createFollow();
    // case "PUT":
    //   return updateUser();
    case "DELETE":
      return deleteFollow();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
