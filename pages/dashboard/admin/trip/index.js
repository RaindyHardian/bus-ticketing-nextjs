import { useMemo } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { getSession } from "next-auth/client";
import Layout from "../../../../components/layout/layout";
import ListTable from "../../../../components/admin/bus/list/ListTable";
import styles from "../../../../styles/admin.module.css";
import Head from "next/head";

export default function AdminListTrip(props) {
  const router = useRouter();
  const { trip } = props;

  async function deleteTrip(e, id) {
    e.preventDefault();
    if (id === null) {
      toast.error("Error, can't delete trip");
      return;
    }
    const submitData = {
      trip_id: id,
    };

    const response = await fetch("/api/trip/delete", {
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
    router.push("/dashboard/admin/trip");
  }

  const columns = useMemo(
    () => [
      {
        Header: "Start",
        accessor: "start", // accessor is the "key" in the data
      },
      {
        Header: "Destination",
        accessor: "destination",
      },
      {
        Header: "Date",
        accessor: "trip_date",
      },
      {
        Header: "Pickup",
        accessor: "trip_time",
      },
      {
        Header: "Drop",
        accessor: "drop_time",
      },
      {
        Header: "Fare",
        accessor: "fare",
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
      trip.map((item) => {
        return {
          ...item,
          action: (
            <>
              <button
                className={styles.buttonUpdate}
                style={{ marginRight: "5px" }}
                onClick={() =>
                  router.push(`/dashboard/admin/trip/${item.trip_id}`)
                }
              >
                Detail
              </button>
              <button
                className={styles.buttonDelete}
                onClick={(e) => deleteTrip(e, item.trip_id)}
              >
                Delete
              </button>
            </>
          ),
        };
      }),
    [deleteTrip]
  );

  return (
    <Layout admin>
      <Head>
        <title>List Trip | BookYourSeat</title>
        <meta
          name="description"
          content="BookYourSeat is a digital platform for booking your bus ticket online easily."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1 className={styles.title}>List Trip</h1>
        <ListTable columns={columns} data={data} />
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session || session.user.role !== 2) {
    return {
      redirect: {
        destination: "/account/login",
        permanent: false,
      },
    };
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/trip`, {
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
      trip: data.trip,
    },
  };
}
