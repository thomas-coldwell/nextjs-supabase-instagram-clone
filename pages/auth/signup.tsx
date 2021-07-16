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
import { PhotoInput } from "../../components/PhotoInput/PhotoInput";
import { uriToFile } from "../../utils/uriToFile";

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

  const userMutation = useMutation(async (user: Prisma.UserCreateInput) => {
    const response = await fetch(`${baseUrl}/api/user`, {
      method: "POST",
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  });

  const handleSubmit = async ({
    email,
    password,
    profilePicture,
    ...rest
  }: SignUpValues) => {
    try {
      const signUp = await supabase.auth.signUp({
        email,
        password,
      });
      if (!signUp.user || signUp.error) throw signUp.error;
      const avatarFile = await uriToFile(profilePicture, {
        width: 300,
        height: 300,
      });
      const avatarPath = `${signUp.user.id}/profile.jpg`;
      const avatar = await supabase.storage
        .from("avatars")
        .upload(avatarPath, avatarFile);
      if (!avatar.data || avatar.error) throw avatar.error;
      await userMutation.mutate({
        id: signUp.user.id,
        email,
        profilePicture: avatarPath,
        ...rest,
      });
      router.push("/");
    } catch (error) {
      alert(error ? error.message : "An unknown error occurred.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full max-w-md min-h-screen px-4 py-8">
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
        Sign up by entering your details below...
      </h1>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, handleChange, setFieldValue, isSubmitting }) => {
          return (
            <Form className="flex flex-col items-center w-full">
              <PhotoInput
                className="w-1/2 mb-4 aspect-w-2 aspect-h-1"
                description="profile picture"
                value={values.profilePicture}
                disabled={isSubmitting}
                onImageChange={(blob) => setFieldValue("profilePicture", blob)}
              />
              <Input
                placeholder="Enter your email..."
                disabled={isSubmitting}
                value={values.email}
                onChange={handleChange("email")}
                autoComplete="email"
              />
              <Input
                placeholder="Create a password..."
                disabled={isSubmitting}
                value={values.password}
                onChange={handleChange("password")}
                type="password"
                autoComplete="off"
              />
              <Input
                placeholder="Enter your first name..."
                disabled={isSubmitting}
                value={values.firstName}
                onChange={handleChange("firstName")}
              />
              <Input
                placeholder="Enter your last name..."
                disabled={isSubmitting}
                value={values.lastName}
                onChange={handleChange("lastName")}
              />
              <Input
                placeholder="Enter a username..."
                disabled={isSubmitting}
                value={values.username}
                onChange={handleChange("username")}
              />
              <Button type="submit" disabled={isSubmitting} className="mb-4">
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
