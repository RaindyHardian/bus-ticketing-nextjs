import { useMemo } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { getSession } from "next-auth/client";
import Layout from "../../../../components/layout/layout";
import ListTable from "../../../../components/admin/bus/list/ListTable";
import styles from "../../../../styles/admin.module.css";
import Head from "next/head";

export default function AdminListBus(props) {
  const router = useRouter();
  const { bus } = props;

  async function deleteBus(e, id) {
    e.preventDefault();
    if (id === null) {
      toast.error("Error, can't delete bus");
      return;
    }
    const submitData = {
      bus_id: id,
    };

    const response = await fetch("/api/bus/delete", {
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
    router.push("/dashboard/admin/bus");
  }

  const columns = useMemo(
    () => [
      {
        Header: "Type",
        accessor: "type", // accessor is the "key" in the data
      },
      {
        Header: "No. Polisi",
        accessor: "nopol",
      },
      {
        Header: "Total Seat",
        accessor: "total_seat",
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
      bus.map((item) => {
        return {
          ...item,
          action: (
            <>
              <button
                className={styles.buttonUpdate}
                style={{ marginRight: "5px" }}
                onClick={() =>
                  router.push(`/dashboard/admin/bus/${item.bus_id}`)
                }
              >
                Update
              </button>
              <button
                className={styles.buttonDelete}
                onClick={(e) => deleteBus(e, item.bus_id)}
              >
                Delete
              </button>
            </>
          ),
        };
      }),
    [deleteBus]
  );

  return (
    <Layout admin>
      <Head>
        <title>List Bus | BookYourSeat</title>
        <meta
          name="description"
          content="BookYourSeat is a digital platform for booking your bus ticket online easily."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1>List Bus</h1>
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

  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/bus`, {
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
      bus: data.busdata,
    },
  };
}
