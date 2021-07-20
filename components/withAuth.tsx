import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { baseUrl } from "../lib/auth";
import { supabase } from "../lib/supabase";

type AuthedComponent = React.ComponentType<any>;

const withAuth = (AuthedComponent: AuthedComponent) => {
  return (props: any) => {
    const router = useRouter();
    const [verified, setVerified] = useState(false);

    useEffect(() => {
      const session = supabase.auth.session();
      // if no accessToken was found,then we redirect to "/" page.
      if (!session?.access_token) {
        router.replace("/auth");
      } else {
        fetch(`${baseUrl}/api/auth/getUser`, {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json",
            token: session.access_token,
          }),
        }).then((response) => {
          if (!response.ok) {
            router.replace("/auth");
          } else {
            setVerified(true);
          }
        });
      }
    }, []);

    if (verified) {
      return <AuthedComponent {...props} />;
    } else {
      return null;
    }
  };
};

export default withAuth;
