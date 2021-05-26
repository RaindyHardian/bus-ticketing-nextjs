import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import styles from "./form.module.css";

export default function FormCreateTrip(props) {
  const router = useRouter();
  const [bus_id, setBusId] = useState(0);
  const [start, setStart] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [dropTime, setDropTime] = useState("");
  const [fare, setFare] = useState(0);

  async function submit(e) {
    e.preventDefault();
    if (
      bus_id === 0 ||
      start.trim() === "" ||
      destination.trim() === "" ||
      date.trim() === "" ||
      pickupTime.trim() === "" ||
      dropTime.trim() === "" ||
      fare < 0
    ) {
      toast.error("Please fill all the form");
      return;
    }
    const submitData = {
      bus_id: bus_id,
      start: start,
      destination: destination,
      trip_date: date,
      trip_time: pickupTime,
      drop_time: dropTime,
      fare: fare,
    };

    const response = await fetch("/api/trip", {
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
    router.push("/dashboard/admin/trip");
  }

  return (
    <div>
      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Bus</label>
          <select
            placeholder="Select Bus Type"
            name="bus_id"
            onChange={(e) => {
              setBusId(e.target.value);
            }}
          >
            <option value={0}>Select Bus</option>
            {props.bus.map((item) => (
              <option value={item.bus_id} key={item.bus_id}>
                {item.type}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Pickup Location</label>
          <input
            className={styles.formInput}
            type="text"
            name="pickup"
            placeholder="Insert the pickup location"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Drop Location</label>
          <input
            className={styles.formInput}
            type="text"
            name="drop"
            placeholder="Insert the drop location"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Trip Date</label>
          <input
            className={styles.formInput}
            type="Date"
            name="trip_date"
            placeholder="Insert the trip date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Pickup Time</label>
          <input
            className={styles.formInput}
            type="time"
            name="pickup_time"
            placeholder="Insert the pickup time"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Drop Time</label>
          <input
            className={styles.formInput}
            type="time"
            name="drop_time"
            placeholder="Insert the drop time"
            value={dropTime}
            onChange={(e) => setDropTime(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Ticket Fare</label>
          <input
            className={styles.formInput}
            type="number"
            name="fare"
            placeholder="Insert the ticket fare"
            value={fare}
            onChange={(e) => setFare(e.target.value)}
          />
        </div>
        <div>
          <button className={styles.formSubmit} onClick={submit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
