import React from "react";
import styles from "./seatbuilderitem.module.css";

const SeatBuilderItem = ({ disabled, seatKey, clickSeat }) => {
  const click = () => {
    clickSeat(seatKey);
  };

  if (disabled) {
    return <div className={styles.disabled} onClick={click}></div>;
  }
  return (
    <div className={styles.seatbuilderitem} onClick={click}>
      {seatKey + 1}
    </div>
  );
};

export default SeatBuilderItem;
