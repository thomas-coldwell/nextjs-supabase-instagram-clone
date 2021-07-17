import { Post as PostInterface, User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { supabase } from "../../../lib/supabase";

interface IPostProps {
  data: PostInterface & {
    author: User;
  };
}

const Post = ({ data }: IPostProps) => {
  //
  const { caption, createdAt, author } = data;

  const avatarUrl = useMemo(() => {
    const { publicURL, error } = supabase.storage
      .from("avatars")
      .getPublicUrl(author.profilePicture);
    return publicURL ? publicURL : "";
  }, [author]);

  return (
    <div className="w-full">
      <div className="flex flex-row items-center justify-start w-full">
        <div className="relative w-10 h-10 mr-4">
          <Link href={`/user/${author.username}`}>
            <a className="absolute w-full h-full overflow-hidden bg-gray-300 rounded-full">
              {author && (
                <Image
                  src={avatarUrl}
                  className="w-full h-full"
                  alt={`${author.firstName} ${author.lastName}`}
                  layout="fill"
                />
              )}
            </a>
          </Link>
        </div>
        <p className="font-medium text-gray-800">{author.username}</p>
      </div>
    </div>
  );
};

export default Post;
