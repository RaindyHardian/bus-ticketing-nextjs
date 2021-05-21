import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { DateTime } from "luxon";
import styles from "./ticketListItem.module.css";

export default function TicketListItem(props) {
  const { item, width } = props;
  const router = useRouter();

  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "IDR",
  });

  if (width <= 420) {
    return (
      <div className={styles.card} key={item.trip_id}>
        <p className={styles.busType}>{item.type}</p>
        <div className={styles.cardInfo}>
          <div className={styles.cardGroup}>
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
          </div>

          <div className={styles.cardGroup_2}>
            <p className={styles.time}>
              {DateTime.fromSQL(item.trip_date).toLocaleString(
                DateTime.DATE_FULL
              )}
            </p>
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
