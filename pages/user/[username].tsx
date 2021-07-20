import { GetServerSideProps } from "next";
import { Header } from "../../components/Header";
import {
  ProfileDetails,
  UserProfileDetails,
} from "../../components/screens/User/ProfileDetails";
import withAuth from "../../components/withAuth";
import { prisma } from "../../lib/prisma";
import { supabase } from "../../lib/supabase";

interface IUserProps {
  user: UserProfileDetails;
}

const UserProfile = (props: IUserProps) => {
  //
  const { user } = props;

  return (
    <div className="w-full px-4">
      <Header />
      <ProfileDetails user={user} />
    </div>
  );
};

export default withAuth(UserProfile);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const username = context.params?.username?.toString() ?? "";
  const user = await prisma.user.findFirst({
    where: { username },
    select: {
      firstName: true,
      lastName: true,
      username: true,
      profilePicture: true,
      id: true,
      _count: {
        select: { followers: true, followings: true, posts: true },
      },
    },
  });
  if (user) {
    user.profilePicture =
      supabase.storage.from("avatars").getPublicUrl(user.profilePicture)
        .publicURL ?? "";
    return {
      props: {
        user,
      },
    };
  } else {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
};
