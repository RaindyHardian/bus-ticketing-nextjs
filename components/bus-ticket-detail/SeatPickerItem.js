import styles from "./seatPickerItem.module.css";

export default function SeatPickerItem({
  seatId,
  seatCode,
  disabled,
  ticket_id,
  selected,
  handleClick,
}) {
  const click = () => {
    handleClick(seatId, seatCode);
  };

  if (disabled) {
    return <div className={styles.seatpickeritem__disabled}></div>;
  }

  if (ticket_id) {
    return <div className={styles.seatpickeritem__booked}>{seatCode}</div>;
  }

  if (selected) {
    return (
      <div className={styles.seatpickeritem__selected} onClick={click}>
        {seatCode}
      </div>
    );
  }

  return (
    <div className={styles.seatpickeritem} onClick={click}>
      {seatCode}
    </div>
  );
}
