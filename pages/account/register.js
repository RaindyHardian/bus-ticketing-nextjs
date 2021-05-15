import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { toast } from "react-toastify";

import Layout from "../../components/layout/layout";
import styles from "../..//styles/register.module.css";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);
  const [passNotMatch, setPassNotMatch] = useState(false);

  const [loading, setLoading] = useState(false);

  async function registerHandler(e) {
    e.preventDefault();
    let isError = false;
    if (name.trim() === "") {
      isError = true;
      setNameError(true);
    } else {
      setNameError(false);
    }

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

      if (passwordConfirm.trim() === "") {
        isError = true;
        setPasswordConfirmError(true);
      } else {
        setPasswordConfirmError(false);

        if (password !== passwordConfirm) {
          isError = true;
          setPassNotMatch(true);
        } else {
          setPassNotMatch(false);
        }
      }
    }

    if (!isError) {
      setLoading(true);
      const response = await fetch("/api/account/register", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
          password2: passwordConfirm,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setName("");
        setEmail("");
        setPassword("");
        setPasswordConfirm("");
        toast.error(data.message);
        setLoading(false);
        return;
      }

      toast.success(data.message);
      setLoading(false);
      router.push("/");
    }
  }

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>Let's create your account</h1>
        <form className={styles.form} onSubmit={registerHandler}>
          <div className={styles.formGroup}>
            <input
              className={styles.formText}
              type="text"
              name="name"
              value={name}
              placeholder="Fullname"
              onChange={(e) => setName(e.target.value)}
            />
            {nameError && (
              <div className={styles.formError}>Full Name is required</div>
            )}
          </div>
          <div>
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
          <div className={styles.formGroup}>
            <input
              className={styles.formText}
              type="password"
              name="passwordConfirm"
              value={passwordConfirm}
              placeholder="Password Confirmation"
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
            {passwordConfirmError && (
              <div className={styles.formError}>
                Password confirmation is required
              </div>
            )}
            {passNotMatch && (
              <div className={styles.formError}>
                Password confirmation is wrong
              </div>
            )}
          </div>
          {!loading ? (
            <button className={styles.registerButton}>Register</button>
          ) : (
            <button className={styles.registerButtonLoading} disabled>
              Register
            </button>
          )}
        </form>
        <div className={styles.information}>
          <p>
            Already have an account?{" "}
            <Link href="/account/login">
              <a className={styles.link}>Log in</a>
            </Link>
          </p>
          <p>By creating an account you agree to our Terms and Conditions,</p>
          <p>our Privacy Policy, and our End User License Agreement.</p>
        </div>
      </div>
    </Layout>
  );
}
