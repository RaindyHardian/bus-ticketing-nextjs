import { useState } from "react";
import Link from "next/link";
import styles from "./navbar.module.css";
import { useSession, signOut } from "next-auth/client";
import { useRouter } from "next/router";

import RoundedImage from "../ui/RoundedImage";
import { FaAngleDown } from "react-icons/fa";

export default function Navbar() {
  const router = useRouter();
  const [session, loading] = useSession();
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div className={styles.navbar}>
      <div>
        <Link href="/">
          <a className={styles.logo}>BookYourSeat</a>
        </Link>
      </div>
      {!session && !loading && (
        <ul className={styles.navList}>
          <li>
            <Link href="/account/login">
              <a
                className={
                  router.pathname == "/account/login"
                    ? styles.navLinkActive
                    : styles.navLink
                }
              >
                Login
              </a>
            </Link>
          </li>
          <li>
            <Link href="/account/register">
              <a
                className={
                  router.pathname == "/account/register"
                    ? styles.navLinkActive
                    : styles.navLink
                }
              >
                Register
              </a>
            </Link>
          </li>
        </ul>
      )}

      {session && !loading && (
        <ul className={styles.navList}>
          <li>
            <Link href="/dashboard/my-ticket">
              <a
                className={
                  router.pathname == "/dashboard/my-ticket"
                    ? styles.navLinkActive
                    : styles.navLink
                }
              >
                My Ticket
              </a>
            </Link>
          </li>
          {session.user.role === 2 && (
            <li>
              <Link href="/dashboard/admin">
                <a className={styles.navLink}>Admin</a>
              </Link>
            </li>
          )}
          <li>
            <div
              className={styles.dropdown}
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <RoundedImage alt={session.user.name} width="35" height="35" />
              <FaAngleDown />
            </div>
            <div
              className={
                profileOpen
                  ? styles.dropdownContent
                  : styles.dropdownContentClose
              }
            >
              <div>
                <p className={styles.dropwdownText}>Hi, {session.user.name}</p>
                <Link href="">
                  <a className={styles.dropdownLink}>Account Setting</a>
                </Link>
                <a className={styles.dropdownLink} onClick={() => signOut()}>
                  Logout
                </a>
              </div>
            </div>
          </li>
        </ul>
      )}
    </div>
  );
}
