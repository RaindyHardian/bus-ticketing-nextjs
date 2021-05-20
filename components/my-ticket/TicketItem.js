import { DateTime } from "luxon";
import Image from "next/image";

import styles from "./ticketItem.module.css";

export default function TicketItem(props) {
  const { item } = props;

  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "IDR",
  });

  return (
    <div className={styles.card} key={item.trip_id}>
      <p className={styles.busType}>({item.ticket_id}) - {item.type}</p>
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
          <p className={styles.time}>
            {item.name}
          </p>
        </div>
        <div>
          <p className={styles.seat}>Seat {item.seat_code}</p>
          <p className={styles.price}>{formatter.format(item.fare)}</p>
          <button className={styles.chooseButton} onClick={() => true}>
            Check
          </button>
        </div>
      </div>
    </div>
  );
}
