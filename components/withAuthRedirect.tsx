import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { baseUrl } from "../lib/auth";
import { supabase } from "../lib/supabase";

const withAuthRedirect = (AuthedComponent: React.ComponentType) => {
  const HOC = (props: any) => {
    const router = useRouter();
    useEffect(() => {
      const session = supabase.auth.onAuthStateChange((event, session) => {
        if (session) {
          // If we are already logged in then redirect to the home screen
          if (session?.access_token) {
            router.replace("/");
          }
        }
      });
    }, []);
    return <AuthedComponent {...props} />;
  };
  return HOC;
};

export default withAuthRedirect;
