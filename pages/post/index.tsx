import { Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import { MdArrowBack } from "react-icons/md";
import { PhotoInput } from "../../components/PhotoInput/PhotoInput";
import cn from "classnames";
import { Textarea } from "../../components/Textarea";
import { Button } from "../../components/Button";
import { uriToFile } from "../../utils/uriToFile";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../../lib/supabase";
import { trpc } from "../../utils/trpc";

interface PostValues {
  images: string[];
  caption: string;
}

const initialValues: PostValues = {
  images: [],
  caption: "",
};

const Post = () => {
  //
  const router = useRouter();

  const postAdd = trpc.useMutation("post.add");

  const handleSubmit = async ({ images, caption }: PostValues) => {
    const session = supabase.auth.session();
    if (session?.user) {
      const photoFile = await uriToFile(images[0], {
        width: 1200,
        height: 1200,
      });
      const photoPath = `${session.user.id}/${uuidv4()}.jpg`;
      const photo = await supabase.storage
        .from("post-photos")
        .upload(photoPath, photoFile);
      if (!photo.data || photo.error) throw photo.error;
      await postAdd.mutateAsync({
        images: [photoPath],
        caption,
        authorId: session.user.id,
      });
      router.replace("/");
    }
  };

  return (
    <div className="flex flex-col items-center w-full px-4">
      <div className="flex flex-row items-center w-full">
        <button
          className="flex flex-row items-center h-16 font-medium text-gray-600"
          onClick={() => router.back()}
        >
          <MdArrowBack className="w-6 h-6 mr-2" />
          <p className="mb-1">Back</p>
        </button>
      </div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, handleChange, setFieldValue, isSubmitting }) => {
          return (
            <Form className="flex flex-col items-center w-full max-w-sm">
              <div className="w-full mb-4">
                <h1 className="text-2xl font-medium text-gray-800">New post</h1>
              </div>
              <div className="w-full h-auto">
                <PhotoInput
                  className={cn("mb-4 w-full aspect-w-1 aspect-h-1")}
                  description="photo"
                  value={values.images[0]}
                  disabled={isSubmitting}
                  onImageChange={(blob) => setFieldValue("images[0]", blob)}
                />
              </div>
              <Textarea
                className="resize-none h-28"
                placeholder="Enter a post caption..."
                draggable={false}
                value={values.caption}
                disabled={isSubmitting}
                onChange={handleChange("caption")}
              />
              <Button disabled={isSubmitting}>Post</Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Post;
