import Layout from "../../../../components/layout/layout";
import { getSession } from "next-auth/client";
import FormCreateTrip from "../../../../components/admin/trip/create/Form";
import styles from "../../../../styles/admin.module.css";
import Head from "next/head";

export default function CreateTrip(props) {
  const { bus } = props;
  return (
    <Layout admin>
      <Head>
        <title>Create Trip | BookYourSeat</title>
        <meta
          name="description"
          content="BookYourSeat is a digital platform for booking your bus ticket online easily."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1 className={styles.title}>Create New Trip</h1>
        <FormCreateTrip bus={bus} />
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
