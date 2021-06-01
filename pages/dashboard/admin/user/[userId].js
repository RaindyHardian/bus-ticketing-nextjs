import { useMemo } from "react";
import Layout from "../../../../components/layout/layout";
import { getSession } from "next-auth/client";
import ListTable from "../../../../components/admin/bus/list/ListTable";
import { toast } from "react-toastify";
import InfoDetail from "../../../../components/admin/user/InfoDetail";
import styles from "../../../../styles/admin.module.css";

export default function UserDetail(props) {
  const { user, ticket } = props;

  async function deleteTicket(e, id) {
    e.preventDefault();
    if (id === null) {
      toast.error("Error, can't delete ticket");
      return;
    }
    const submitData = {
      ticket_id: id,
    };

    const response = await fetch("/api/ticket/delete", {
      method: "DELETE",
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
    router.push("/dashboard/admin/user");
  }

  const columns = useMemo(
    () => [
      {
        Header: "Ticket ID",
        accessor: "ticket_id", // accessor is the "key" in the data
      },
      {
        Header: "Passenger",
        accessor: "name",
      },
      {
        Header: "Seat Code",
        accessor: "seat_code",
      },
      {
        Header: "Action",
        accessor: "action",
      },
    ],
    []
  );

  const data = useMemo(
    () =>
      ticket.map((item) => {
        return {
          ...item,
          action: (
            <button
              className={styles.buttonDelete}
              onClick={(e) => deleteTicket(e, item.ticket_id)}
            >
              Delete
            </button>
          ),
        };
      }),
    [deleteTicket]
  );

  return (
    <Layout admin>
      <div>
        <h1 className={styles.title}>User Detail Information</h1>
        <InfoDetail user={user} />
        <ListTable columns={columns} data={data} />
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const userId = context.params.userId;

  if (!session) {
    return {
      redirect: {
        destination: "/account/login",
        permanent: false,
      },
    };
  }

  const res = await fetch(`http://localhost:3000/api/user/${userId}`, {
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
      user: data.user,
      ticket: data.ticket,
    },
  };
}
