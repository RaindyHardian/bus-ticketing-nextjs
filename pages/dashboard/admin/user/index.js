import { useMemo } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/client";
import Layout from "../../../../components/layout/layout";
import ListTable from "../../../../components/admin/bus/list/ListTable";
import styles from "../../../../styles/admin.module.css";

export default function AdminListUser(props) {
  const router = useRouter();
  const { user } = props;

  const columns = useMemo(
    () => [
      {
        Header: "User ID",
        accessor: "user_id", // accessor is the "key" in the data
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "email",
        accessor: "email",
      },
      {
        Header: "Role",
        accessor: "role",
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
      user.map((item) => {
        return {
          ...item,
          action: (
            <button
              className={styles.buttonUpdate}
              onClick={() =>
                router.push(`/dashboard/admin/user/${item.user_id}`)
              }
            >
              Detail
            </button>
          ),
        };
      }),
    []
  );

  return (
    <Layout admin>
      <div>
        <h1 className={styles.title}>List User</h1>
        <ListTable columns={columns} data={data} />
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

  const res = await fetch("http://localhost:3000/api/user", {
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
    },
  };
}
