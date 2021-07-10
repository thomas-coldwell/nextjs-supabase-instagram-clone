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

interface SignUpValues {
  email: string;
  password: string;
}

const SignUp = () => {
  //
  const router = useRouter();

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async ({ email, password }: SignUpValues) => {
    setSubmitting(true);
    const { user, error } = await supabase.auth.signUp({ email, password });
    if (user) {
      router.push("/");
    } else {
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
      <h1 className="mb-8 text-2xl text-center text-gray-800">
        Sign up by entering an email and password below...
      </h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange }) => {
          return (
            <Form>
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
