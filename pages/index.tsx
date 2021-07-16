import { supabase } from "../lib/supabase";
import { Header } from "../components/Header";
import { useEffect } from "react";
import withAuth from "../components/withAuth";
import { MdAdd } from "react-icons/md";
import useResponsive from "../utils/useResponsive";
import { useRouter } from "next/router";

const Home = () => {
  //
  const { isMobile, isSmallMobile } = useResponsive();

  const router = useRouter();

  return (
    <>
      <div className="w-full px-4">
        <Header showAddPost={!(isMobile || isSmallMobile)} />
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
