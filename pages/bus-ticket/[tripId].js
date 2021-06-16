import { useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

import SeatPickerItem from "../../components/bus-ticket-detail/SeatPickerItem";
import Layout from "../../components/layout/layout";
import styles from "../../styles/busTicketDetail.module.css";
import InputNameItem from "../../components/bus-ticket-detail/InputNameItem";
import Header from "../../components/bus-ticket-detail/Header";
import SeatSelected from "../../components/bus-ticket-detail/SeatSelected";

const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    padding: 0,
    inset: "25px",
  },
};

Modal.setAppElement("#__next");

export default function BusTicketDetailPage(props) {
  const [session, loading] = useSession();
  const router = useRouter();
  const [selected, setSelected] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  let item = props.trip.row * props.trip.col;
  let grid = {
    gridTemplateColumns: `repeat(${props.trip.col}, 50px)`,
  };

  const handleClick = (seatId, seatCode) => {
    // check if the seat is already selected
    if (selected.some((element) => element.seat_id === seatId)) {
      setSelected((prev) => {
        // delete array element that have the matched seat ID
        return [...prev.filter((element) => element.seat_id !== seatId)];
      });
      return;
    }

    if (selected.length === 3) {
      toast.warning("You can only choose 3 seat");
      return;
    }

    setSelected((prev) => {
      return [
        ...prev,
        {
          name: "",
          seat_id: seatId,
          seat_code: seatCode,
          trip_id: props.trip.trip_id,
        },
      ];
    });
  };

  function openModal() {
    if (!session) {
      return toast.error("Please log in to your account");
    }
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    const name = "";
    let items = [...selected];
    for (let i = 0; i < selected.length; i++) {
      let item = { ...selected[i], name: name };
      items[i] = item;
    }
    setSelected(items);
  }

  // function to set the name of the person whose occupy the seat
  const handlePName = (name, index) => {
    // 1. Make a shallow copy of the items
    let items = [...selected];
    // 2. Make a shallow copy of the item you want to mutate and Replace the property you're intested in
    let item = { ...selected[index], name: name };
    // 3. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    items[index] = item;
    // 4. Set the state to our new copy
    setSelected(items);
  };

  async function buyTicketHandler(e) {
    e.preventDefault();
    setSubmitLoading(true);
    const response = await fetch("/api/ticket", {
      method: "POST",
      body: JSON.stringify(selected),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error(data.message);
      setSubmitLoading(false);
      return;
    }

    toast.success(data.message);
    setSubmitLoading(false);
    router.push("/dashboard/my-ticket");
  }

  return (
    <Layout>
      <div className={styles.container}>
        <Header trip={props.trip} />

        <div className={styles.content}>
          <div>
            <h3 className={styles.labelFront}>Front</h3>
            <div className={styles.grid_container} style={grid}>
              {Array.apply(null, Array(item)).map((e, i) => (
                <SeatPickerItem
                  key={i}
                  seatId={props.seat[i].seat_id}
                  seatCode={props.seat[i].seat_code}
                  disabled={props.seat[i].disable === 1}
                  ticket_id={props.seat[i].ticket_id}
                  selected={selected.some(
                    (element) => element.seat_id === props.seat[i].seat_id
                  )}
                  handleClick={handleClick}
                />
              ))}
            </div>
          </div>
          <div className={styles.selected}>
            <SeatSelected selected={selected} openModal={openModal} />
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Finalize your order, specify the passenger name"
      >
        <div className={styles.modalHeader}>
          <h1>Finalize your order</h1>
          <button onClick={closeModal} className={styles.modalClose}>
            Close
          </button>
        </div>
        <div className={styles.modalContent}>
          <form>
            {selected.map((item, index) => (
              <InputNameItem
                key={item.seat_code}
                index={index}
                name={item.name}
                seat_code={item.seat_code}
                handlePName={handlePName}
              />
            ))}
            <button className={styles.modalSubmit} onClick={buyTicketHandler}>
              Order
            </button>
          </form>
        </div>
      </Modal>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { tripId } = params;

  const res = await fetch("http://localhost:3000/api/trip/" + tripId);
  const data = await res.json();

  if (!res.ok) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      trip: data.trip,
      seat: data.seat,
      ticket: data.ticket,
    },
  };
}
