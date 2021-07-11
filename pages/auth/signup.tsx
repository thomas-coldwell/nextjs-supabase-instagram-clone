import { Auth, Typography } from "@supabase/ui";
import { GetServerSideProps } from "next";
import React, { useState } from "react";
import { Input } from "../../components/Input";
import { supabase } from "../../lib/supabase";
import { Button } from "../../components/Button";
import { Formik, Form } from "formik";
import Image from "next/image";
import InstagramLogo from "../../public/instagram.svg";
import Link from "next/link";
import { useRouter } from "next/router";
import withAuthRedirect from "../../components/withAuthRedirect";
import { useMutation } from "react-query";
import { baseUrl } from "../../lib/auth";
import { Prisma } from "@prisma/client";
import { PhotoInput } from "../../components/PhotoInput";
interface SignUpValues {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  username: string;
  profilePicture: string;
}

const initialValues: SignUpValues = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  username: "",
  profilePicture: "",
};

const SignUp = () => {
  //
  const router = useRouter();

  const [submitting, setSubmitting] = useState(false);

  const userMutation = useMutation(async (user: Prisma.UserCreateInput) => {
    await fetch(`${baseUrl}/api/user`, {
      method: "POST",
      body: JSON.stringify(user),
    });
  });

  const handleSubmit = async ({ email, password, ...rest }: SignUpValues) => {
    setSubmitting(true);
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      await userMutation.mutate({ email, ...rest });
      router.push("/");
    } catch (error) {
      alert(error ? error.message : "An unknown error occurred.");
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen max-w-md px-4">
      <div className="mb-4">
        <Image
          src={InstagramLogo}
          alt="Instagram logo | Home"
          className="object-contain"
          height={50}
          width={140}
        />
      </div>
      <h1 className="mb-6 text-2xl text-center text-gray-800">
        Sign up by entering an email and password below...
      </h1>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, handleChange }) => {
          return (
            <Form className="flex flex-col items-center w-full">
              <PhotoInput className="w-1/2 mb-4 aspect-w-2 aspect-h-1" />
              <Input
                placeholder="Enter your email..."
                disabled={submitting}
                value={values.email}
                onChange={handleChange("email")}
              />
              <Input
                placeholder="Create a password..."
                disabled={submitting}
                value={values.password}
                onChange={handleChange("password")}
                type="password"
              />
              <Input
                placeholder="Enter your first name..."
                disabled={submitting}
                value={values.firstName}
                onChange={handleChange("firstName")}
              />
              <Input
                placeholder="Enter your last name..."
                disabled={submitting}
                value={values.lastName}
                onChange={handleChange("lastName")}
              />
              <Input
                placeholder="Enter a username..."
                disabled={submitting}
                value={values.username}
                onChange={handleChange("username")}
              />
              <Button type="submit" disabled={submitting} className="mb-4">
                Sign up
              </Button>
            </Form>
          );
        }}
      </Formik>
      <Link href="/auth/login">
        <a className="text-sm text-blue-400 underline">
          Already have an account? Go to login
        </a>
      </Link>
    </div>
  );
};

export default withAuthRedirect(SignUp);
