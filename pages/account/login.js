import { useState } from "react";
import Head from "next/head"
import Link from "next/link";
import { useRouter } from "next/router";
import { getSession, signIn } from "next-auth/client";
import { toast } from "react-toastify";

import Layout from "../../components/layout/layout";
import styles from "../..//styles/login.module.css";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [loadingLogin, setLoadingLogin] = useState(false);

  async function loginHandler(e) {
    e.preventDefault();
    let isError = false;

    if (email.trim() === "") {
      isError = true;
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    if (password.trim() === "") {
      isError = true;
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    if (!isError) {
      setLoadingLogin(true);

      const result = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
      });

      if (!result.error) {
        // set some auth state
        router.replace("/");
        toast.success("Login succeeded");
      }

      toast.error(result.error);
      setLoadingLogin(false);
    }
  }

  return (
    <Layout>
      <Head>
        <title>Login to your account | BookYourSeat</title>
        <meta
          name="description"
          content="BookYourSeat is a digital platform for booking your bus ticket online easily."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <h1 className={styles.title}>Login to your account</h1>
        <form className={styles.form} onSubmit={loginHandler}>
          <div className={styles.formGroup}>
            <input
              className={styles.formText}
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && (
              <div className={styles.formError}>Email is required</div>
            )}
          </div>
          <div className={styles.formGroup}>
            <input
              className={styles.formText}
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && (
              <div className={styles.formError}>Password is required</div>
            )}
          </div>
          {!loadingLogin ? (
            <button className={styles.loginButton}>Login</button>
          ) : (
            <button className={styles.loginButtonLoading} disabled>
              Login
            </button>
          )}
        </form>
        <div className={styles.information}>
          <p>
            Doesn't have an account?{" "}
            <Link href="/account/register">
              <a className={styles.link}>Register</a>
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
