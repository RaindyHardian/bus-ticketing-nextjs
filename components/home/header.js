import { useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./header.module.css";

function Header() {
  const router = useRouter();
  const fromRef = useRef();
  const toRef = useRef();
  const dateRef = useRef();

  function submitHandler(e) {
    e.preventDefault();
    console.log(
      fromRef.current.value,
      toRef.current.value,
      dateRef.current.value
    );
    router.push(
      `/bus-ticket?from=${fromRef.current.value}&to=${toRef.current.value}&trip_date=${dateRef.current.value}`
    );
  }

  return (
    <div className={styles.header}>
      <div className={styles.navbar}>
        <div className={styles.logo}>BookYourSeat</div>
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
