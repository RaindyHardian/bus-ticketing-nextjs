import Link from "next/link";
import styles from "./navbar.module.css";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <div>
        <Link href="/">
          <a className={styles.logo}>BookYourSeat</a>
        </Link>
      </div>
      <ul className={styles.navList}>
        <li>
          <Link href="/login">
            <a className={styles.navLink}>Login</a>
          </Link>
        </li>
        <li>
          <Link href="/register">
            <a className={styles.navLink}>Register</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}
