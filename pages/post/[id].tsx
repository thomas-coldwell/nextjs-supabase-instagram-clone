import { GetServerSideProps } from "next";

interface IViewPostProps {
  id: number;
}

const ViewPost = ({ id }: IViewPostProps) => {
  return <p>{id}</p>;
};

export default ViewPost;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: { id: context?.params?.id },
  };
};
