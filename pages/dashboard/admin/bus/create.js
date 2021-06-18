import Layout from "../../../../components/layout/layout";
import { getSession } from "next-auth/client";
import FormCreateBus from "../../../../components/admin/bus/create/Form";
import styles from "../../../../styles/admin.module.css";
import Head from "next/head";

export default function CreateBus() {
  return (
    <Layout admin>
      <Head>
        <title>Create Bus | BookYourSeat</title>
        <meta
          name="description"
          content="BookYourSeat is a digital platform for booking your bus ticket online easily."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1 className={styles.title}>Create New Bus</h1>
        <FormCreateBus />
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
  return {
    props: {},
  };
}
