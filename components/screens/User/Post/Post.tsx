import {
  PostLike,
  User,
  Post as PostInterface,
  PostComment,
} from "@prisma/client";
import classNames from "classnames";
import dayjs from "dayjs";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { MdComment, MdFavorite } from "react-icons/md";
import { supabase } from "../../../../lib/supabase";
import { StatsCounter } from "./StatsCounter";

interface IPostProps {
  data: PostInterface & {
    author: User;
    likes: PostLike[];
    comments: PostComment[];
  };
}

export const Post = ({ data }: IPostProps) => {
  //
  const { caption, createdAt, author, images } = data;

  const [image, setImage] = useState<string | null>(null);

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
    <div className="bg-gray-200 aspect-h-1 aspect-w-1" key={data.id}>
      {image && (
        <Image
          src={image}
          loader={({ src }) => src}
          className="w-full h-full"
          alt={caption}
          layout="fill"
        />
      )}
      <div
        className={classNames(
          "flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-0 opacity-0 cursor-pointer",
          "transition duration-300 hover:opacity-100 hover:bg-opacity-30"
        )}
      >
        <div className="flex flex-col items-center justify-center w-full px-4 md:flex-row">
          <StatsCounter icon={MdFavorite} count={data.likes.length} />
          <StatsCounter icon={MdComment} count={data.comments.length} />
        </div>
      </div>
    </div>
  );
};
