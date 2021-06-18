import { useState } from "react";
import { DateTime } from "luxon";
import Image from "next/image";
import { toast } from "react-toastify";
import useWindowSize from "../../utils/UseWindowSize";

import styles from "./ticketItem.module.css";
import Seat from "./Seat";

export default function TicketItem(props) {
  const { ticket } = props;
  const [width, height] = useWindowSize();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [seat, setSeat] = useState([]);

  async function viewSeat(e) {
    e.preventDefault();
    setLoading(true);
    if (isOpen === false) {
      const res = await fetch(
        `/api/bus/${ticket.bus_id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setIsOpen(false);
        toast.error("Error, can't get seat data");
      } else {
        setSeat(data.seatdata);
        setIsOpen(true);
      }
    } else {
      setIsOpen(false);
    }
    setLoading(false);
  }

  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "IDR",
  });

  if (width <= 420) {
    return (
      <div className={styles.card} key={ticket.trip_id}>
        <p className={styles.busType}>
          ({ticket.ticket_id}) - {ticket.type}
        </p>
        <div className={styles.cardInfo}>
          <div className={styles.cardGroup}>
            <div>
              <p className={styles.time}>{ticket.trip_time.slice(0, -3)}</p>
              <p className={styles.location}>{ticket.start}</p>
            </div>
            <div className={styles.cardNext}>
              <Image src="/images/east.svg" alt="to" width={24} height={24} />
            </div>
            <div>
              <p className={styles.time}>{ticket.drop_time.slice(0, -3)}</p>
              <p className={styles.location}>{ticket.destination}</p>
            </div>
          </div>

          <div className={styles.cardGroup}>
            <p className={styles.time}>
              {DateTime.fromSQL(ticket.trip_date).toLocaleString(
                DateTime.DATE_FULL
              )}
            </p>
            <p className={styles.price}>{formatter.format(ticket.fare)}</p>
          </div>

          <div className={styles.cardGroup_2}>
            <p className={styles.time}>{ticket.name}</p>
            <p className={styles.seat}>Seat {ticket.seat_code}</p>
            <button className={styles.chooseButton} onClick={viewSeat}>
              View Seat
            </button>
          </div>
        </div>
        <div>
          {isOpen && !loading ? <Seat ticket={ticket} seat={seat} /> : null}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.card} key={ticket.trip_id}>
      <p className={styles.busType}>
        ({ticket.ticket_id}) - {ticket.type}
      </p>
      <div className={styles.cardInfo}>
        <div>
          <p className={styles.time}>{ticket.trip_time.slice(0, -3)}</p>
          <p className={styles.location}>{ticket.start}</p>
        </div>
        <div className={styles.cardNext}>
          <Image src="/images/east.svg" alt="to" width={24} height={24} />
        </div>
        <div>
          <p className={styles.time}>{ticket.drop_time.slice(0, -3)}</p>
          <p className={styles.location}>{ticket.destination}</p>
        </div>
        <div>
          <p className={styles.time}>
            {DateTime.fromSQL(ticket.trip_date).toLocaleString(
              DateTime.DATE_FULL
            )}
          </p>
          <p className={styles.time}>{ticket.name}</p>
        </div>
        <div>
          <p className={styles.seat}>Seat {ticket.seat_code}</p>
          <p className={styles.price}>{formatter.format(ticket.fare)}</p>
          <button className={styles.chooseButton} onClick={viewSeat}>
            View Seat
          </button>
        </div>
      </div>
      <div>
        {isOpen && !loading ? <Seat ticket={ticket} seat={seat} /> : null}
      </div>
    </div>
  );
}
