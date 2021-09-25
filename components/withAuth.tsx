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
        // If they do have an acess token we need to verify it
        fetch(`${window.location.origin}/api/auth/getUser`, {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json",
            token: session.access_token,
          }),
        }).then((response) => {
          if (!response.ok) {
            // If the response was not ok, we need to revoke thier token
            // and redirect them to the login page
            supabase.auth.signOut();
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
