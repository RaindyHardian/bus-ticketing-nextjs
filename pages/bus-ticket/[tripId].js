import { useState } from "react";
import { DateTime } from "luxon";
import Image from "next/image";

import SeatPickerItem from "../../components/bus-ticket-detail/SeatPickerItem";
import Layout from "../../components/layout/layout";
import styles from "../../styles/busTicketDetail.module.css";

export default function BusTicketDetailPage(props) {
  const [selected, setSelected] = useState([]);

  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "IDR",
  });

  const handleClick = (seatId, seatCode) => {
    // check if the seat is already selected
    if (selected.some((element) => element.seat_id === seatId)) {
      setSelected((prev) => {
        // delete array element that have the matched seat ID
        return [...prev.filter((element) => element.seat_id !== seatId)];
      });
    } else {
      setSelected((prev) => {
        return [
          ...prev,
          {
            person_name: "",
            seat_id: seatId,
            seat_code: seatCode,
          },
        ];
      });
    }
  };

  let item = props.trip.row * props.trip.col;
  let grid = {
    gridTemplateColumns: `repeat(${props.trip.col}, 50px)`,
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.headerTitle}>Choose your seat</p>
          <div className={styles.cardInfo}>
            <div>
              <p className={styles.time}>
                {DateTime.fromSQL(props.trip.trip_time).toLocaleString(
                  DateTime.TIME_24_SIMPLE
                )}
              </p>
              <p className={styles.location}>{props.trip.start}</p>
            </div>
            <div className={styles.cardNext}>
              <Image src="/images/east.svg" alt="to" width={24} height={24} />
            </div>
            <div>
              <p className={styles.time}>
                {DateTime.fromSQL(props.trip.drop_time).toLocaleString(
                  DateTime.TIME_24_SIMPLE
                )}
              </p>
              <p className={styles.location}>{props.trip.destination}</p>
            </div>
            <div>
              <p className={styles.time}>
                {DateTime.fromSQL(props.trip.trip_date).toLocaleString(
                  DateTime.DATE_FULL
                )}
              </p>
              <p className={styles.price}>
                {formatter.format(props.trip.fare)}
              </p>
            </div>
            <div>
              <p className={styles.seat}>{props.trip.type}</p>
              <p className={styles.seat}>{props.trip.total_seat} Seat Bus</p>
            </div>
          </div>
        </div>

        <div className={styles.content}>
          <div>
            <h3 className={styles.labelFront}>Front</h3>
            <div className={styles.grid_container} style={grid}>
              {Array.apply(null, Array(item)).map((e, i) => (
                <SeatPickerItem
                  key={i}
                  seatId={props.seat[i].seat_id}
                  seatCode={props.seat[i].seat_code}
                  disabled={props.seat[i].disable === 1}
                  ticket_id={props.seat[i].ticket_id}
                  selected={selected.some(
                    (element) => element.seat_id === props.seat[i].seat_id
                  )}
                  handleClick={handleClick}
                />
              ))}
            </div>
          </div>
          <div className={styles.selected}>
            <div className={styles.selected_title}>Seat Selected</div>
            <ul className={styles.selected_list}>
              {selected.map((item) => (
                <li key={item.seat_code} className={styles.selected_list_item}>
                  {item.seat_code}
                </li>
              ))}
            </ul>
            <button
              className={styles.orderButton}
              disabled={selected.length === 0}
            >
              Order
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { tripId } = params;

  const res = await fetch("http://localhost:3000/api/trip/" + tripId);
  const data = await res.json();

  if (!res.ok) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      trip: data.trip,
      seat: data.seat,
      ticket: data.ticket,
    },
  };
}
