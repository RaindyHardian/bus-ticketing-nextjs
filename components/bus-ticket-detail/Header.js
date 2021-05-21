import { DateTime } from "luxon";
import Image from "next/image";
import useWindowSize from "../../utils/UseWindowSize";
import styles from "./header.module.css";

export default function Header(props) {
  const [width, height] = useWindowSize();

  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "IDR",
  });

  const trip_time = props.trip.trip_time.slice(0, -3);
  const drop_time = props.trip.drop_time.slice(0, -3);

  if (width <= 420) {
    return (
      <div className={styles.header}>
        <p className={styles.headerTitle}>Choose your seat</p>
        <div className={styles.cardInfo}>
          <div className={styles.cardGroup}>
            <div className={styles.cardInline}>
              <p className={styles.time}>{trip_time}</p>
              <p className={styles.location}>{props.trip.start}</p>
            </div>
            <div className={styles.cardNext}>
              <Image src="/images/east.svg" alt="to" width={24} height={24} />
            </div>
            <div className={styles.cardInline}>
              <p className={styles.time}>{drop_time}</p>
              <p className={styles.location}>{props.trip.destination}</p>
            </div>
          </div>
          <div className={styles.cardGroup_2}>
            <p className={styles.time}>
              {DateTime.fromSQL(props.trip.trip_date).toLocaleString(
                DateTime.DATE_FULL
              )}
            </p>
            <p className={styles.price}>{formatter.format(props.trip.fare)}</p>
          </div>
          <div className={styles.cardGroup_2}>
            <p className={styles.seat}>{props.trip.type}</p>
            <p className={styles.seat}>{props.trip.total_seat} Seat Bus</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.header}>
      <p className={styles.headerTitle}>Choose your seat</p>
      <div className={styles.cardInfo}>
        <div>
          <p className={styles.time}>{trip_time}</p>
          <p className={styles.location}>{props.trip.start}</p>
        </div>
        <div className={styles.cardNext}>
          <Image src="/images/east.svg" alt="to" width={24} height={24} />
        </div>
        <div>
          <p className={styles.time}>{drop_time}</p>
          <p className={styles.location}>{props.trip.destination}</p>
        </div>
        <div>
          <p className={styles.time}>
            {DateTime.fromSQL(props.trip.trip_date).toLocaleString(
              DateTime.DATE_FULL
            )}
          </p>
          <p className={styles.price}>{formatter.format(props.trip.fare)}</p>
        </div>
        <div>
          <p className={styles.seat}>{props.trip.type}</p>
          <p className={styles.seat}>{props.trip.total_seat} Seat Bus</p>
        </div>
      </div>
    </div>
  );
}
