import { useRef } from "react";
import styles from "./inputNameItem.module.css";

export default function InputNameItem(props) {
  const inputRef = useRef();
  const { seat_code, index, handlePName } = props;

  return (
    <>
      <label htmlFor="passengerName" className={styles.label}>
        Seat {seat_code}
      </label>
      <input
        className={styles.inputText}
        type="text"
        name="passengerName"
        placeholder="Passenger Name"
        onChange={() => handlePName(inputRef.current.value, index)}
        ref={inputRef}
      />
    </>
  );
}
