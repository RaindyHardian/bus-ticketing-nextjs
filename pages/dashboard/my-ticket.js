import { getSession } from "next-auth/client";
import Layout from "../../components/layout/layout";
import TicketItem from "../../components/my-ticket/TicketItem";

import styles from "../../styles/myTicket.module.css";

function MyTicket(props) {
  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>My Ticket</h1>
        {props.ticket.length > 0 ? (
          props.ticket.map((item) => (
            <TicketItem key={item.ticket_id} ticket={item} />
          ))
        ) : (
          <div className={styles.noData}>
            Sorry, you don't have any ticket yet
          </div>
        )}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/account/login",
        permanent: false,
      },
    };
  }

  const res = await fetch("http://localhost:3000/api/ticket/me", {
    headers: {
      "Content-Type": "application/json",
      cookie: context.req.headers.cookie,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    return {
      redirect: {
        destination: "/account/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      ticket: data.ticketdata,
      dataLength: data.dataLength,
      perPage: data.perPage,
    },
  };
}

export default MyTicket;
