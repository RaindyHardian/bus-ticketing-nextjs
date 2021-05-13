import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/layout/layout";
import Image from "next/image";

import styles from "../../styles/busTicket.module.css";

function AllBusTicketPage(props) {
  const router = useRouter();
  const { from, to, trip_date } = router.query;
  const [fromInput, setFromInput] = useState(from || "");
  const [toInput, setToInput] = useState(to || "");
  const [dateInput, setDateInput] = useState(trip_date || "");

  return (
    <Layout>
      <form className={styles.form}>
        <input
          className={styles.formText + " mr-2"}
          type="text"
          name="from"
          placeholder="From"
          value={fromInput}
          onChange={(e) => setFromInput(e.target.value)}
        />
        <div className="mr-2">
          <Image
            src="/images/navigate_next.svg"
            alt="to"
            width={30}
            height={30}
          />
        </div>
        <input
          className={styles.formText + " mr-2"}
          type="text"
          name="to"
          placeholder="To"
          value={toInput}
          onChange={(e) => setToInput(e.target.value)}
        />
        <input
          className={styles.formText + " mr-2"}
          type="date"
          name="trip_date"
          value={dateInput}
          onChange={(e) => setDateInput(e.target.value)}
        />
        <button className={styles.formButton}>Find</button>
      </form>

      <div className={styles.mainContainer}>
        <div className={styles.optionContainer}>
          <h3 className={styles.optionTitle}>Pickup Time</h3>
          <div className={styles.radioButton}>
            <input
              type="radio"
              id="pick1"
              name="pickup"
              value="1"
            />
            <label htmlFor="pick1" className="pl-2">00.00 - 06.00</label>
          </div>
          <div className={styles.radioButton}>
            <input
              type="radio"
              id="pick2"
              name="pickup"
              value="2"
            />
            <label htmlFor="pick2" className="pl-2">06.00 - 12.00</label>
          </div>
          <div className={styles.radioButton}>
            <input
              type="radio"
              id="pick3"
              name="pickup"
              value="3"
            />
            <label htmlFor="pick3" className="pl-2">12.00 - 18.00</label>
          </div>
          <div className={styles.radioButton}>
            <input
              type="radio"
              id="pick4"
              name="pickup"
              value="4"
            />
            <label htmlFor="pick4" className="pl-2">18.00 - 24.00</label>
          </div>

          <h3 className={styles.optionTitle + " mt-3"}>Drop Time</h3>
          <div className={styles.radioButton}>
            <input
              type="radio"
              id="drop1"
              name="drop"
              value="1"
            />
            <label htmlFor="drop1" className="pl-2">00.00 - 06.00</label>
          </div>
          <div className={styles.radioButton}>
            <input
              type="radio"
              id="drop2"
              name="drop"
              value="2"
            />
            <label htmlFor="drop2" className="pl-2">06.00 - 12.00</label>
          </div>
          <div className={styles.radioButton}>
            <input
              type="radio"
              id="drop3"
              name="drop"
              value="3"
            />
            <label htmlFor="drop3" className="pl-2">12.00 - 18.00</label>
          </div>
          <div className={styles.radioButton}>
            <input
              type="radio"
              id="drop4"
              name="drop"
              value="4"
            />
            <label htmlFor="drop4" className="pl-2">18.00 - 24.00</label>
          </div>
        </div>

        <div>
          {props.trip.map((item) => (
            <div className={styles.card} key={item.id}>
              <p className={styles.busType}>{item.type}</p>
              <div className={styles.cardInfo}>
                <div>
                  <p className={styles.time}>21.30</p>
                  <p className={styles.location}>Semarang</p>
                </div>
                <div className={styles.cardNext}>
                  <Image
                    src="/images/east.svg"
                    alt="to"
                    width={24}
                    height={24}
                  />
                </div>
                <div>
                  <p className={styles.time}>04.00</p>
                  <p className={styles.location}>Solo</p>
                </div>
                <div>
                  <p className={styles.time}>15 Mei 2021</p>
                </div>
                <div>
                  <p className={styles.seat}>10 seat available</p>
                  <p className={styles.price}>Rp.150,000</p>
                  <button className={styles.chooseButton}>Choose</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(
    "http://localhost:3000/api/trip?" + new URLSearchParams(context.query)
  );
  const data = await res.json();

  return {
    props: {
      trip: data.trip,
      dataLength: data.dataLength,
      perPage: data.perPage,
    },
  };
}

export default AllBusTicketPage;
