import { GetServerSideProps } from "next";
import { Header } from "../../components/Header/Header";
import { Post } from "../../components/screens/User/Post/Post";
import {
  ProfileDetails,
  UserProfileDetails,
} from "../../components/screens/User/ProfileDetails";
import withAuth from "../../components/withAuth";
import { prisma } from "../../lib/prisma";
import { supabase } from "../../lib/supabase";
import { trpc } from "../../utils/trpc";
interface IUserProps {
  user: UserProfileDetails;
}

const UserProfile = (props: IUserProps) => {
  //
  const { user } = props;

  const { data: posts } = trpc.useQuery([
    "profileFeed.all",
    { username: user.username },
  ]);

  return (
    <div className="w-full px-4">
      <Header />
      <ProfileDetails user={user} />
      <div className="grid grid-cols-3 gap-1 my-4 md:my-16 sm:gap-4">
        {posts?.map((post, index) => {
          return <Post key={post.id} data={post} />;
        })}
      </div>
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
