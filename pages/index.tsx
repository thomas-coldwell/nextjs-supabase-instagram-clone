import { supabase } from "../lib/supabase";
import { Header } from "../components/Header/Header";
import { useEffect } from "react";
import withAuth from "../components/withAuth";
import { MdAdd } from "react-icons/md";
import useResponsive from "../utils/useResponsive";
import { useRouter } from "next/router";
import Post from "../components/screens/Home/Post/Post";
import { trpc } from "../utils/trpc";

const Home = () => {
  //
  const { isMobile, isSmallMobile } = useResponsive();

  const router = useRouter();

  const { data: posts } = trpc.useQuery([
    "feed.all",
    { userId: supabase.auth.user()?.id },
  ]);

  return (
    <>
      <div className="box-border flex flex-col items-center w-full px-4 pb-36 md:pb-0">
        <Header showAddPost={!(isMobile || isSmallMobile)} />
        {posts?.map((post) => (
          <Post key={post.id} data={post} />
        ))}
      </div>
      {(isMobile || isSmallMobile) && (
        <button
          className="fixed flex items-center justify-center w-20 h-20 bg-blue-500 rounded-full bottom-8 right-8"
          onClick={() => router.push("/post")}
        >
          <MdAdd className="w-12 h-12 text-white" />
        </button>
      )}
    </>
  );
};

export default withAuth(Home);
