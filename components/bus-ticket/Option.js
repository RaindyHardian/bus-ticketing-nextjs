import styles from "./option.module.css";

export default function Option(props) {
  const { pickupOption, pickupHandler, dropOption, dropHandler } = props;

  return (
    <div className={styles.optionContainer}>
      <h3 className={styles.optionTitle}>Pickup Time</h3>
      <div className={styles.radioButton}>
        <input
          type="radio"
          id="pick1"
          name="pickup"
          value="1"
          checked={pickupOption === "1"}
          onClick={pickupHandler}
          onChange={() => {}}
        />
        <label htmlFor="pick1" className="pl-2">
          00.00 - 06.00
        </label>
      </div>
      <div className={styles.radioButton}>
        <input
          type="radio"
          id="pick2"
          name="pickup"
          value="2"
          checked={pickupOption === "2"}
          onClick={pickupHandler}
          onChange={() => {}}
        />
        <label htmlFor="pick2" className="pl-2">
          06.00 - 12.00
        </label>
      </div>
      <div className={styles.radioButton}>
        <input
          type="radio"
          id="pick3"
          name="pickup"
          value="3"
          checked={pickupOption === "3"}
          onClick={pickupHandler}
          onChange={() => {}}
        />
        <label htmlFor="pick3" className="pl-2">
          12.00 - 18.00
        </label>
      </div>
      <div className={styles.radioButton}>
        <input
          type="radio"
          id="pick4"
          name="pickup"
          value="4"
          checked={pickupOption === "4"}
          onClick={pickupHandler}
          onChange={() => {}}
        />
        <label htmlFor="pick4" className="pl-2">
          18.00 - 24.00
        </label>
      </div>

      <h3 className={styles.optionTitle + " mt-3"}>Drop Time</h3>
      <div className={styles.radioButton}>
        <input
          type="radio"
          id="drop1"
          name="drop"
          value="1"
          checked={dropOption === "1"}
          onClick={dropHandler}
          onChange={() => {}}
        />
        <label htmlFor="drop1" className="pl-2">
          00.00 - 06.00
        </label>
      </div>
      <div className={styles.radioButton}>
        <input
          type="radio"
          id="drop2"
          name="drop"
          value="2"
          checked={dropOption === "2"}
          onClick={dropHandler}
          onChange={() => {}}
        />
        <label htmlFor="drop2" className="pl-2">
          06.00 - 12.00
        </label>
      </div>
      <div className={styles.radioButton}>
        <input
          type="radio"
          id="drop3"
          name="drop"
          value="3"
          checked={dropOption === "3"}
          onClick={dropHandler}
          onChange={() => {}}
        />
        <label htmlFor="drop3" className="pl-2">
          12.00 - 18.00
        </label>
      </div>
      <div className={styles.radioButton}>
        <input
          type="radio"
          id="drop4"
          name="drop"
          value="4"
          checked={dropOption === "4"}
          onClick={dropHandler}
          onChange={() => {}}
        />
        <label htmlFor="drop4" className="pl-2">
          18.00 - 24.00
        </label>
      </div>
    </div>
  );
}
