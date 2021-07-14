// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<User>
) {
  //

  const getUserById = async () => {
    const id = req.query.id;
    if (typeof id === "string") {
      const user = await prisma.user.findUnique({
        where: { id },
      });
      if (user) {
        return res.status(200).json(user);
      } else {
        res.status(404).end(`User with id: ${id} not found`);
      }
    } else {
      return res.status(400).end("id query param must be singular");
    }
  };

  const createUser = async () => {
    try {
      const user = await prisma.user.create({ data: JSON.parse(req.body) });
      res.status(200).json(user);
    } catch (error) {
      res.status(400).end(error);
    }
  };

  switch (req.method) {
    case "GET":
      return getUserById();
    case "POST":
      return createUser();
    // case "PUT":
    //   return updateUser();
    // case "DELETE":
    //   return deleteUser();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
