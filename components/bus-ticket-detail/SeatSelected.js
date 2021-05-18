import styles from "./seatSelected.module.css";

export default function SeatSelected(props) {
  const { selected, openModal } = props;
  return (
    <>
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
        onClick={openModal}
      >
        Order
      </button>
    </>
  );
}
