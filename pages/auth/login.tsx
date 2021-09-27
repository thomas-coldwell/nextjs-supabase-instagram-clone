import { Auth, Typography } from "@supabase/ui";
import { GetServerSideProps } from "next";
import React, { useState } from "react";
import { Input } from "../../components/Input";
import { supabase } from "../../lib/supabase";
import { Button } from "../../components/Button";
import { Formik, FormikValues, Form } from "formik";
import Image from "next/image";
import InstagramLogo from "../../public/instagram.svg";
import Link from "next/link";
import { useRouter } from "next/router";
import withAuthRedirect from "../../components/withAuthRedirect";

interface LoginValues {
  email: string;
  password: string;
}

const Login = () => {
  //
  const router = useRouter();

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async ({ email, password }: LoginValues) => {
    setSubmitting(true);
    const { user, error } = await supabase.auth.signIn({ email, password });
    if (error) {
      alert(error ? error.message : "An unknown error occurred.");
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full max-w-md px-4 min-h-screen-vp">
      <div className="mb-4">
        <Image
          src={InstagramLogo}
          alt="Instagram logo | Home"
          className="object-contain"
          height={50}
          width={140}
        />
      </div>
      <h1 className="mb-8 text-2xl text-center text-gray-800">
        Enter your login details below...
      </h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange }) => {
          return (
            <Form>
              <Input
                placeholder="Email..."
                disabled={submitting}
                value={values.email}
                onChange={handleChange("email")}
              />
              <Input
                placeholder="Password..."
                disabled={submitting}
                value={values.password}
                onChange={handleChange("password")}
                type="password"
              />
              <Button type="submit" disabled={submitting} className="mb-4">
                Login
              </Button>
            </Form>
          );
        }}
      </Formik>
      <Link href="/auth/signup">
        <a className="text-sm text-blue-400 underline">
          Don&apos;t have an account yet? Sign up
        </a>
      </Link>
    </div>
  );
};

export default withAuthRedirect(Login);
