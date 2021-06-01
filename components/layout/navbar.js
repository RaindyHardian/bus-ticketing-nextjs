import Link from "next/link";
import styles from "./navbar.module.css";

import { useSession, signOut } from "next-auth/client";

export default function Navbar() {
  const [session, loading] = useSession();

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
              <a className={styles.navLink}>Login</a>
            </Link>
          </li>
          <li>
            <Link href="/account/register">
              <a className={styles.navLink}>Register</a>
            </Link>
          </li>
        </ul>
      )}
      {session && !loading && (
        <ul className={styles.navList}>
          <li>
            <Link href="/dashboard/my-ticket">
              <a className={styles.navLink}>My Ticket</a>
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
            <a className={styles.navLink} onClick={() => signOut()}>
              Logout
            </a>
          </li>
        </ul>
      )}
    </div>
  );
}
