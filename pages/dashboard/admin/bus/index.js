import { useMemo } from "react";
import { getSession } from "next-auth/client";
import Layout from "../../../../components/layout/layout";
import BusListTable from "../../../../components/admin/bus/list/BusListTable";

export default function AdminListBus(props) {
  const { ticket } = props;
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
      ticket.map((item) => {
        return {
          ...item,
          action: (
            <>
              <button>Update</button>
              <button>Delete</button>
            </>
          ),
        };
      }),
    []
  );

  return (
    <Layout admin>
      <div>
        <h1>List Bus</h1>
        <BusListTable columns={columns} data={data} />
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

  const res = await fetch("http://localhost:3000/api/bus", {
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
      // dataLength: data.dataLength,
      // perPage: data.perPage,
    },
  };
}
