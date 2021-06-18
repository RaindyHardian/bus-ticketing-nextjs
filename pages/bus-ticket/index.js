import { useState, useRef } from "react";
import useWindowSize from "../../utils/UseWindowSize";

import Layout from "../../components/layout/layout";
import styles from "../../styles/busTicket.module.css";

import Search from "../../components/bus-ticket/Search";
import Option from "../../components/bus-ticket/Option";
import TicketListItem from "../../components/bus-ticket/TicketListItem";

function AllBusTicketPage(props) {
  const [width, height] = useWindowSize();

  const [pickupOption, setPickupOption] = useState("");
  const [dropOption, setDropOption] = useState("");
  const [tripFiltered, setTripFiltered] = useState([]);

  const [showOption, setShowOption] = useState(false);
  const refOption = useRef();

  function openCloseOption(e) {
    e.preventDefault();
    if (showOption) {
      refOption.current.style.display = "none";
      setShowOption(false);
    } else {
      refOption.current.style.display = "initial";
      setShowOption(true);
    }
  }

  function pickupHandler(e) {
    let pickupFrom = "00:00:00";
    let pickupUntil = "23:59:99";
    let dropFrom = "00:00:00";
    let dropUntil = "23:59:99";

    if (pickupOption === e.target.value) {
      setPickupOption("");
    } else {
      setPickupOption(e.target.value);
      if (e.target.value === "1") {
        pickupFrom = "00:00:00";
        pickupUntil = "06:00:00";
      } else if (e.target.value === "2") {
        pickupFrom = "06:00:00";
        pickupUntil = "12:00:00";
      } else if (e.target.value === "3") {
        pickupFrom = "12:00:00";
        pickupUntil = "18:00:00";
      } else if (e.target.value === "4") {
        pickupFrom = "18:00:00";
        pickupUntil = "23:59:99";
      }
    }

    if (dropOption === "1") {
      dropFrom = "00:00:00";
      dropUntil = "06:00:00";
    } else if (dropOption === "2") {
      dropFrom = "06:00:00";
      dropUntil = "12:00:00";
    } else if (dropOption === "3") {
      dropFrom = "12:00:00";
      dropUntil = "18:00:00";
    } else if (dropOption === "4") {
      dropFrom = "18:00:00";
      dropUntil = "23:59:99";
    }

    setTripFiltered(
      props.trip.filter((item) => {
        return (
          item.trip_time >= pickupFrom &&
          item.trip_time <= pickupUntil &&
          item.drop_time >= dropFrom &&
          item.drop_time <= dropUntil
        );
      })
    );
  }

  function dropHandler(e) {
    let dropFrom = "00:00:00";
    let dropUntil = "23:59:99";
    let pickupFrom = "00:00:00";
    let pickupUntil = "23:59:99";

    if (dropOption === e.target.value) {
      setDropOption("");
    } else {
      setDropOption(e.target.value);
      if (e.target.value === "1") {
        dropFrom = "00:00:00";
        dropUntil = "06:00:00";
      } else if (e.target.value === "2") {
        dropFrom = "06:00:00";
        dropUntil = "12:00:00";
      } else if (e.target.value === "3") {
        dropFrom = "12:00:00";
        dropUntil = "18:00:00";
      } else if (e.target.value === "4") {
        dropFrom = "18:00:00";
        dropUntil = "23:59:99";
      }
    }

    if (pickupOption === "1") {
      pickupFrom = "00:00:00";
      pickupUntil = "06:00:00";
    } else if (pickupOption === "2") {
      pickupFrom = "06:00:00";
      pickupUntil = "12:00:00";
    } else if (pickupOption === "3") {
      pickupFrom = "12:00:00";
      pickupUntil = "18:00:00";
    } else if (pickupOption === "4") {
      pickupFrom = "18:00:00";
      pickupUntil = "23:59:99";
    }

    setTripFiltered(
      props.trip.filter((item) => {
        return (
          item.trip_time >= pickupFrom &&
          item.trip_time <= pickupUntil &&
          item.drop_time >= dropFrom &&
          item.drop_time <= dropUntil
        );
      })
    );
  }

  if (width <= 420) {
    return (
      <Layout>
        <Search
          setPickupOption={setPickupOption}
          setDropOption={setDropOption}
        />
        <div className={styles.mainContainer}>
          <div className={styles.optionContainer}>
            <button className={styles.btnFilter} onClick={openCloseOption}>
              Filter
            </button>
            <div className={styles.option} ref={refOption}>
              <Option
                pickupOption={pickupOption}
                pickupHandler={pickupHandler}
                dropOption={dropOption}
                dropHandler={dropHandler}
              />
            </div>
          </div>

          <div>
            {props.trip.length === 0 ? (
              <div className={styles.noTripFound}>
                Sorry, no trips were found
              </div>
            ) : (
              (pickupOption !== "" || dropOption !== "") &&
              tripFiltered.length === 0 && (
                <div className={styles.noTripFound}>
                  Sorry, no trips were found
                </div>
              )
            )}

            {pickupOption === "" &&
              dropOption === "" &&
              props.trip.map((item) => (
                <TicketListItem key={item.trip_id} item={item} width={width} />
              ))}

            {(pickupOption !== "" || dropOption !== "") &&
              tripFiltered.map((item) => (
                <TicketListItem key={item.trip_id} item={item} width={width} />
              ))}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Search setPickupOption={setPickupOption} setDropOption={setDropOption} />
      <div className={styles.mainContainer}>
        <Option
          pickupOption={pickupOption}
          pickupHandler={pickupHandler}
          dropOption={dropOption}
          dropHandler={dropHandler}
        />
        <div>
          {props.trip.length === 0 ? (
            <div className={styles.noTripFound}>Sorry, no trips were found</div>
          ) : (
            (pickupOption !== "" || dropOption !== "") &&
            tripFiltered.length === 0 && (
              <div className={styles.noTripFound}>
                Sorry, no trips were found
              </div>
            )
          )}

          {pickupOption === "" &&
            dropOption === "" &&
            props.trip.map((item) => (
              <TicketListItem key={item.trip_id} item={item} />
            ))}

          {(pickupOption !== "" || dropOption !== "") &&
            tripFiltered.map((item) => (
              <TicketListItem key={item.trip_id} item={item} />
            ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/trip?` +
      new URLSearchParams(context.query)
  );
  const data = await res.json();

  return {
    props: {
      trip: data.trip,
      dataLength: data.dataLength,
      perPage: data.perPage,
    },
  };
}

export default AllBusTicketPage;
