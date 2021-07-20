import { Post as PostInterface, User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import {
  MdComment,
  MdFavoriteBorder,
  MdMenu,
  MdMore,
  MdMoreHoriz,
} from "react-icons/md";
import { supabase } from "../../../../lib/supabase";
import dayjs from "dayjs";
import { IconButton } from "./IconButton";
import { Dropdown } from "../../../Dropdown/Dropdown";

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

  const postAge = useMemo(() => {
    const deltaInSeconds = dayjs(new Date()).diff(createdAt) / 1000;
    const minutes = deltaInSeconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    if (minutes < 60) {
      return `${minutes.toFixed(0)} mins ago`;
    } else if (hours < 24) {
      return `${hours.toFixed(0)} hours ago`;
    } else {
      return `${days.toFixed(0)} days ago`;
    }
  }, [createdAt]);

  return (
    <div className="flex flex-col w-full max-w-md mb-4">
      <div className="z-10 flex flex-row items-center justify-between w-full py-4">
        <div className="flex flex-row items-center">
          <Link href={`/user/${author.username}`}>
            <a className="relative w-10 h-10 mr-4">
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
            </a>
          </Link>
          <Link href={`/user/${author.username}`}>
            <a className="font-medium text-gray-800">{author.username}</a>
          </Link>
        </div>
        <Dropdown
          options={[
            {
              text: "Would you like an easter egg?",
              onClick: () => alert("Okay, here you go 🥚"),
            },
          ]}
          icon={MdMoreHoriz}
        />
      </div>
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
        <IconButton icon={MdFavoriteBorder} />
        <IconButton icon={MdComment} />
      </div>
      <p className="text-gray-800">
        <Link href={`/user/${author.username}`}>
          <a className="font-medium">{author.username}</a>
        </Link>{" "}
        {caption}
      </p>
      <p className="text-sm text-gray-400">{postAge}</p>
    </div>
  );
};

export default Post;
