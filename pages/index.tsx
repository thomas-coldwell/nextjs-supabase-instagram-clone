import { supabase } from "../lib/supabase";
import { Header } from "../components/Header";
import { useEffect } from "react";
import withAuth from "../components/withAuth";

const Home = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col w-50">home</div>
    </>
  );
};

export default withAuth(Home);
