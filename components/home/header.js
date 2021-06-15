import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/client";

import styles from "./header.module.css";

import RoundedImage from "../ui/RoundedImage";
import { FaAngleDown } from "react-icons/fa";

function Header() {
  const router = useRouter();
  const [session, loading] = useSession();
  const fromRef = useRef();
  const toRef = useRef();
  const dateRef = useRef();
  const [profileOpen, setProfileOpen] = useState(false);

  function submitHandler(e) {
    e.preventDefault();
    router.push(
      `/bus-ticket?from=${fromRef.current.value}&to=${toRef.current.value}&trip_date=${dateRef.current.value}`
    );
  }

  return (
    <div className={styles.header}>
      <div className={styles.navbar}>
        <div className={styles.logo}>BookYourSeat</div>
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
              <div
                className={styles.dropdown}
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <RoundedImage alt={session.user.name} width="35" height="35" />
                <FaAngleDown className={styles.angleDown} />
              </div>
              <div
                className={
                  profileOpen
                    ? styles.dropdownContent
                    : styles.dropdownContentClose
                }
              >
                <div>
                  <p className={styles.dropwdownText}>
                    Hi, {session.user.name}
                  </p>
                  <Link href="">
                    <a className={styles.dropdownLink}>Account Setting</a>
                  </Link>
                  <a className={styles.dropdownLink} onClick={() => signOut()}>
                    Logout
                  </a>
                </div>
              </div>
            </li>
            {/* <li>
              <a className={styles.navLink} onClick={() => signOut()}>
                Logout
              </a>
            </li> */}
          </ul>
        )}
      </div>

      <div className={styles.searchTrip}>
        <div className={styles.searchTitle}>
          Find and Book <span className="text-purple">Bus Ticket</span> Here
        </div>
        <form className={styles.form} onSubmit={submitHandler}>
          <div className={styles.formInputGroup}>
            <div className={styles.formGroup + " mr-2"}>
              <label className={styles.label}>From</label>
              <input
                className={styles.formText}
                ref={fromRef}
                type="text"
                name="from"
                placeholder="Jakarta"
              />
            </div>
            <div className={styles.formGroup + " mr-2"}>
              <label className={styles.label}>To</label>
              <input
                className={styles.formText}
                ref={toRef}
                type="text"
                name="To"
                placeholder="Semarang"
              />
            </div>
            <div className={styles.formGroup + " mr-2"}>
              <label className={styles.label}>Trip Date</label>
              <input
                className={styles.formText}
                ref={dateRef}
                type="date"
                name="trip_date"
                placeholder="12 May 2021"
              />
            </div>
          </div>
          <button className={styles.submit}>Find Bus</button>
        </form>
      </div>
    </div>
  );
}

export default Header;
