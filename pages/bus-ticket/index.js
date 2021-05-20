import { useState } from "react";
import { useRouter } from "next/router";
import { DateTime } from "luxon";

import Layout from "../../components/layout/layout";
import Image from "next/image";

import styles from "../../styles/busTicket.module.css";

function AllBusTicketPage(props) {
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

  const [pickupOption, setPickupOption] = useState("");
  const [dropOption, setDropOption] = useState("");
  const [tripFiltered, setTripFiltered] = useState([]);

  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "IDR",
  });

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

  function pickupHandler(e) {
    let pickupFrom = "00:00:00";
    let pickupUntil = "23:59:99";
    let dropFrom = "00:00:00";
    let dropUntil = "23:59:99";

    if (pickupOption === e.target.value) {
      setPickupOption("");
    } else {
      setPickupOption(e.target.value);
      if (e.target.value === "1") {
        pickupFrom = "00:00:00";
        pickupUntil = "06:00:00";
      } else if (e.target.value === "2") {
        pickupFrom = "06:00:00";
        pickupUntil = "12:00:00";
      } else if (e.target.value === "3") {
        pickupFrom = "12:00:00";
        pickupUntil = "18:00:00";
      } else if (e.target.value === "4") {
        pickupFrom = "18:00:00";
        pickupUntil = "23:59:99";
      }
    }

    if (dropOption === "1") {
      dropFrom = "00:00:00";
      dropUntil = "06:00:00";
    } else if (dropOption === "2") {
      dropFrom = "06:00:00";
      dropUntil = "12:00:00";
    } else if (dropOption === "3") {
      dropFrom = "12:00:00";
      dropUntil = "18:00:00";
    } else if (dropOption === "4") {
      dropFrom = "18:00:00";
      dropUntil = "23:59:99";
    }

    setTripFiltered(
      props.trip.filter((item) => {
        return (
          item.trip_time >= pickupFrom &&
          item.trip_time <= pickupUntil &&
          item.drop_time >= dropFrom &&
          item.drop_time <= dropUntil
        );
      })
    );
  }

  function dropHandler(e) {
    let dropFrom = "00:00:00";
    let dropUntil = "23:59:99";
    let pickupFrom = "00:00:00";
    let pickupUntil = "23:59:99";

    if (dropOption === e.target.value) {
      setDropOption("");
    } else {
      setDropOption(e.target.value);
      if (e.target.value === "1") {
        dropFrom = "00:00:00";
        dropUntil = "06:00:00";
      } else if (e.target.value === "2") {
        dropFrom = "06:00:00";
        dropUntil = "12:00:00";
      } else if (e.target.value === "3") {
        dropFrom = "12:00:00";
        dropUntil = "18:00:00";
      } else if (e.target.value === "4") {
        dropFrom = "18:00:00";
        dropUntil = "23:59:99";
      }
    }

    if (pickupOption === "1") {
      pickupFrom = "00:00:00";
      pickupUntil = "06:00:00";
    } else if (pickupOption === "2") {
      pickupFrom = "06:00:00";
      pickupUntil = "12:00:00";
    } else if (pickupOption === "3") {
      pickupFrom = "12:00:00";
      pickupUntil = "18:00:00";
    } else if (pickupOption === "4") {
      pickupFrom = "18:00:00";
      pickupUntil = "23:59:99";
    }

    setTripFiltered(
      props.trip.filter((item) => {
        return (
          item.trip_time >= pickupFrom &&
          item.trip_time <= pickupUntil &&
          item.drop_time >= dropFrom &&
          item.drop_time <= dropUntil
        );
      })
    );
  }

  function showTicketList(item) {
    return (
      <div className={styles.card} key={item.trip_id}>
        <p className={styles.busType}>{item.type}</p>
        <div className={styles.cardInfo}>
          <div>
            <p className={styles.time}>{item.trip_time.slice(0, -3)}</p>
            <p className={styles.location}>{item.start}</p>
          </div>
          <div className={styles.cardNext}>
            <Image src="/images/east.svg" alt="to" width={24} height={24} />
          </div>
          <div>
            <p className={styles.time}>{item.drop_time.slice(0, -3)}</p>
            <p className={styles.location}>{item.destination}</p>
          </div>
          <div>
            <p className={styles.time}>
              {DateTime.fromSQL(item.trip_date).toLocaleString(
                DateTime.DATE_FULL
              )}
            </p>
          </div>
          <div>
            <p className={styles.seat}>{item.total_seat} Seat Bus</p>
            <p className={styles.price}>{formatter.format(item.fare)}</p>
            <button
              className={styles.chooseButton}
              onClick={() => router.push(`/bus-ticket/${item.trip_id}`)}
            >
              Choose
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <form className={styles.form} onSubmit={searchHandler}>
        <div>
          <input
            className={styles.formText + " mr-2"}
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
        <div className="mr-2">
          <Image
            src="/images/navigate_next.svg"
            alt="to"
            width={30}
            height={30}
          />
        </div>
        <div>
          <input
            className={styles.formText + " mr-2"}
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
        <div>
          <input
            className={styles.formText + " mr-2"}
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

      <div className={styles.mainContainer}>
        <div className={styles.optionContainer}>
          <h3 className={styles.optionTitle}>Pickup Time</h3>
          <div className={styles.radioButton}>
            <input
              type="radio"
              id="pick1"
              name="pickup"
              value="1"
              checked={pickupOption === "1"}
              onClick={pickupHandler}
              onChange={() => {}}
            />
            <label htmlFor="pick1" className="pl-2">
              00.00 - 06.00
            </label>
          </div>
          <div className={styles.radioButton}>
            <input
              type="radio"
              id="pick2"
              name="pickup"
              value="2"
              checked={pickupOption === "2"}
              onClick={pickupHandler}
              onChange={() => {}}
            />
            <label htmlFor="pick2" className="pl-2">
              06.00 - 12.00
            </label>
          </div>
          <div className={styles.radioButton}>
            <input
              type="radio"
              id="pick3"
              name="pickup"
              value="3"
              checked={pickupOption === "3"}
              onClick={pickupHandler}
              onChange={() => {}}
            />
            <label htmlFor="pick3" className="pl-2">
              12.00 - 18.00
            </label>
          </div>
          <div className={styles.radioButton}>
            <input
              type="radio"
              id="pick4"
              name="pickup"
              value="4"
              checked={pickupOption === "4"}
              onClick={pickupHandler}
              onChange={() => {}}
            />
            <label htmlFor="pick4" className="pl-2">
              18.00 - 24.00
            </label>
          </div>

          <h3 className={styles.optionTitle + " mt-3"}>Drop Time</h3>
          <div className={styles.radioButton}>
            <input
              type="radio"
              id="drop1"
              name="drop"
              value="1"
              checked={dropOption === "1"}
              onClick={dropHandler}
              onChange={() => {}}
            />
            <label htmlFor="drop1" className="pl-2">
              00.00 - 06.00
            </label>
          </div>
          <div className={styles.radioButton}>
            <input
              type="radio"
              id="drop2"
              name="drop"
              value="2"
              checked={dropOption === "2"}
              onClick={dropHandler}
              onChange={() => {}}
            />
            <label htmlFor="drop2" className="pl-2">
              06.00 - 12.00
            </label>
          </div>
          <div className={styles.radioButton}>
            <input
              type="radio"
              id="drop3"
              name="drop"
              value="3"
              checked={dropOption === "3"}
              onClick={dropHandler}
              onChange={() => {}}
            />
            <label htmlFor="drop3" className="pl-2">
              12.00 - 18.00
            </label>
          </div>
          <div className={styles.radioButton}>
            <input
              type="radio"
              id="drop4"
              name="drop"
              value="4"
              checked={dropOption === "4"}
              onClick={dropHandler}
              onChange={() => {}}
            />
            <label htmlFor="drop4" className="pl-2">
              18.00 - 24.00
            </label>
          </div>
        </div>

        <div>
          {props.trip.length === 0 ? (
            <div className={styles.noTripFound}>Sorry, no trips were found</div>
          ) : (
            (pickupOption !== "" || dropOption !== "") &&
            tripFiltered.length === 0 && (
              <div className={styles.noTripFound}>
                Sorry, no trips were found
              </div>
            )
          )}

          {pickupOption === "" &&
            dropOption === "" &&
            props.trip.map((item) => showTicketList(item))}

          {(pickupOption !== "" || dropOption !== "") &&
            tripFiltered.map((item) => showTicketList(item))}
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
