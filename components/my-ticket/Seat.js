import styles from "./seat.module.css";
import SeatItem from "./SeatItem";

export default function Seat(props) {
  const { ticket, seat } = props;
  let item = ticket.row * ticket.col;
  let grid = {
    gridTemplateColumns: `repeat(${ticket.col}, 50px)`,
  };

  return (
    <div className={styles.grid_container} style={grid}>
      {Array.apply(null, Array(item)).map((e, i) => (
        <SeatItem
          key={i}
          seatId={seat[i].seat_id}
          seatCode={seat[i].seat_code}
          disabled={seat[i].disable === 1}
          userSeat={ticket.seat_id}
        />
      ))}
    </div>
  );
}
