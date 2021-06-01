import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import SeatBuilderItem from "./SeatBuilderItem";
import styles from "./form.module.css";

export default function FormCreateBus() {
  const router = useRouter();
  const [row, setRow] = useState(5);
  const [col, setCol] = useState(5);
  const [type, setType] = useState("");
  const [nopol, setNopol] = useState("");
  const [disabledSeat, setDisabledSeat] = useState([]);
  const item = row * col;

  const grid = {
    gridTemplateColumns: `repeat(${col}, 50px)`,
  };

  const changeCol = (e) => {
    setCol(e.target.value);
    setDisabledSeat([]);
  };

  const changeRow = (e) => {
    setRow(e.target.value);
    setDisabledSeat([]);
  };

  async function submit(e) {
    e.preventDefault();
    if (type.trim() === "" || nopol.trim() === "" || row === 0 || col === 0) {
      toast.error("Please fill all the form");
      return;
    }
    const submitData = {
      type: type,
      nopol: nopol,
      total_seat: row * col - disabledSeat.length,
      disEl: disabledSeat,
      row: row,
      col: col,
      item: item,
    };

    const response = await fetch("/api/bus", {
      method: "POST",
      body: JSON.stringify(submitData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error(data.message);
      return;
    }

    toast.success(data.message);
    router.push("/dashboard/admin/bus");
  }

  const clickSeat = (seatKey) => {
    if (disabledSeat.includes(seatKey)) {
      setDisabledSeat((prev) => {
        return [...prev.filter((element) => element !== seatKey)];
      });
    } else {
      setDisabledSeat((prev) => {
        return [...prev, seatKey];
      });
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Type</label>
          <input
            className={styles.formInput}
            type="text"
            name="type"
            placeholder="Insert the bus type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Police Number</label>
          <input
            className={styles.formInput}
            type="text"
            name="nopol"
            placeholder="Insert the police number"
            value={nopol}
            onChange={(e) => setNopol(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Row</label>
          <input
            className={styles.formInput}
            type="number"
            min={1}
            max={20}
            step={1}
            value={row}
            onChange={changeRow}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Column</label>
          <input
            className={styles.formInput}
            type="number"
            min={1}
            max={20}
            step={1}
            value={col}
            onChange={changeCol}
          />
        </div>
        <div>
          <button className={styles.formSubmit} onClick={submit}>
            Submit
          </button>
        </div>
      </div>
      <div className={styles.grid_container} style={grid}>
        {Array.apply(null, Array(item)).map((e, i) => (
          <SeatBuilderItem
            key={i}
            seatKey={i}
            clickSeat={clickSeat}
            disabled={disabledSeat.includes(i)}
          />
        ))}
      </div>
    </div>
  );
}
