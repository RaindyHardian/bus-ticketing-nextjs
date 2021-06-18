import { useState } from "react";
import { useRouter } from "next/router";
import { DateTime } from "luxon";
import Image from "next/image";
import styles from "./search.module.css";
import Head from "next/head";

export default function Search(props) {
  const { setPickupOption, setDropOption } = props;

  const router = useRouter();
  const { from, to, trip_date } = router.query;

  const [fromInput, setFromInput] = useState(from || "");
  const [toInput, setToInput] = useState(to || "");
  const [dateInput, setDateInput] = useState(
    trip_date || DateTime.now().toISODate()
  );
  const [fromInputError, setFromInputError] = useState(false);
  const [toInputError, setToInputError] = useState(false);
  const [dateInputError, setDateInputError] = useState(false);

  function searchHandler(e) {
    e.preventDefault();
    let isError = false;
    if (fromInput.trim() === "") {
      isError = true;
      setFromInputError(true);
    } else {
      setFromInputError(false);
    }

    if (toInput.trim() === "") {
      isError = true;
      setToInputError(true);
    } else {
      setToInputError(false);
    }

    if (dateInput.trim() === "") {
      isError = true;
      setDateInputError(true);
    } else {
      setDateInputError(false);
    }

    if (!isError) {
      router.push(
        {
          pathname: "/bus-ticket",
          query: { from: fromInput, to: toInput, trip_date: dateInput },
        },
        undefined,
        { shallow: false, scroll: true }
      );
      // reset the option
      setPickupOption("");
      setDropOption("");
    }
  }

  return (
    <form className={styles.form} onSubmit={searchHandler}>
      <Head>
        <title>
          Bus from {from} to {to} | BookYourSeat
        </title>
        <meta
          name="description"
          content={`Book bus ticket from ${from} to ${to} easily and safe.`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.formGroup}>
        <input
          className={styles.formText}
          type="text"
          name="from"
          placeholder="From"
          value={fromInput}
          onChange={(e) => setFromInput(e.target.value)}
        />
        {fromInputError && (
          <div className={styles.errorMessage}>Specify the pickup point</div>
        )}
      </div>
      <div className={styles.formGroupImage}>
        <Image
          src="/images/navigate_next.svg"
          alt="to"
          width={30}
          height={30}
        />
      </div>
      <div className={styles.formGroup}>
        <input
          className={styles.formText}
          type="text"
          name="to"
          placeholder="To"
          value={toInput}
          onChange={(e) => setToInput(e.target.value)}
        />
        {toInputError && (
          <div className={styles.errorMessage}>Specify the drop point</div>
        )}
      </div>
      <div className={styles.formGroup}>
        <input
          className={styles.formText}
          type="date"
          name="trip_date"
          value={dateInput}
          onChange={(e) => setDateInput(e.target.value)}
        />
        {dateInputError && (
          <div className={styles.errorMessage}>Specify the date</div>
        )}
      </div>
      <button className={styles.formButton}>Find</button>
    </form>
  );
}
