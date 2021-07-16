// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Post } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post>
) {
  //

  const getPostById = async () => {
    const id = req.query.id;
    if (typeof id === "string") {
      const post = await prisma.post.findUnique({
        where: { id: parseInt(id) },
      });
      if (post) {
        return res.status(200).json(post);
      } else {
        res.status(404).end(`Post with id: ${id} not found`);
      }
    } else {
      return res.status(400).end("id query param not present");
    }
  };

  const createPost = async () => {
    try {
      const post = await prisma.post.create({ data: JSON.parse(req.body) });
      res.status(200).json(post);
    } catch (error) {
      res.status(400).end(error);
    }
  };

  switch (req.method) {
    case "GET":
      return getPostById();
    case "POST":
      return createPost();
    // case "PUT":
    //   return updateUser();
    // case "DELETE":
    //   return deleteUser();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
