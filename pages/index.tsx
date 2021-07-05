import { Prisma, User } from "@prisma/client";
import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { prisma } from "../lib/prisma";

interface IHomeProps {
  users: User[];
}

export default function Home({ users }: IHomeProps) {
  return (
    <div className="flex flex-col w-50">
      {users.map((user) => {
        return <p key={user.id}>{user.name}</p>;
      })}
    </div>
  );
}

export const getStaticProps: GetStaticProps<IHomeProps> = async (props) => {
  const users = await prisma.user.findMany();
  return {
    props: {
      users,
    },
    revalidate: 1,
  };
};
