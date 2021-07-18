import { Post as PostInterface, User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { MdComment, MdFavoriteBorder } from "react-icons/md";
import { supabase } from "../../../lib/supabase";
interface IPostProps {
  data: PostInterface & {
    author: User;
  };
}

const Post = ({ data }: IPostProps) => {
  //
  const { caption, createdAt, author, images } = data;

  const [image, setImage] = useState<string | null>(null);

  const avatarUrl = useMemo(() => {
    const { publicURL, error } = supabase.storage
      .from("avatars")
      .getPublicUrl(author.profilePicture);
    return publicURL ? publicURL : "";
  }, [author]);

  useEffect(() => {
    const imgPath = images[0];
    const downloadImage = async () => {
      try {
        const { data, error } = await supabase.storage
          .from("post-photos")
          .download(imgPath);
        if (error) {
          throw error;
        }
        const url = URL.createObjectURL(data);
        setImage(url);
      } catch (error) {
        console.log("Error downloading image: ", error.message);
      }
    };
    downloadImage();
  }, [images, author]);

  return (
    <div className="flex flex-col w-full max-w-md mb-4">
      <Link href={`/user/${author.username}`}>
        <a className="flex flex-row items-center justify-start w-full py-4">
          <div className="relative w-10 h-10 mr-4">
            <div className="absolute w-full h-full overflow-hidden bg-gray-300 rounded-full">
              {author && (
                <Image
                  src={avatarUrl}
                  className="w-full h-full"
                  alt={`${author.firstName} ${author.lastName}`}
                  layout="fill"
                />
              )}
            </div>
          </div>
          <p className="font-medium text-gray-800">{author.username}</p>
        </a>
      </Link>
      <div className="w-full mb-4 overflow-hidden bg-gray-300 rounded-md aspect-w-1 aspect-h-1">
        {image && (
          <Image
            src={image}
            loader={({ src }) => src}
            className="w-full h-full"
            alt={caption}
            layout="fill"
          />
        )}
      </div>
      <div className="flex flex-row items-center w-full mb-4">
        <button className="w-8 h-8 mr-2 text-gray-300">
          <MdFavoriteBorder className="w-full h-full" />
        </button>
        <button className="w-8 h-8 text-gray-300">
          <MdComment className="w-full h-full" />
        </button>
      </div>
      <p className="text-gray-800">
        <span className="font-medium">{author.username}</span> {caption}
      </p>
    </div>
  );
};

export default Post;
