import styles from "./seatItem.module.css";

export default function SeatItem({ seatId, seatCode, disabled, userSeat }) {
  if (disabled) {
    return <div className={styles.disabled}></div>;
  }

  if (seatId == userSeat) {
    return <div className={styles.selected}>{seatCode}</div>;
  }

  return <div className={styles.item}>{seatCode}</div>;
}
