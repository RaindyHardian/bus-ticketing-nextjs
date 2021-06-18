import { getSession } from "next-auth/client";
import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "../../../components/layout/layout";
import styles from "../../../styles/dashboardIndex.module.css";

export default function DashboardIndex() {
  const router = useRouter();

  return (
    <Layout admin>
      <Head>
        <title>Dashboard | BookYourSeat</title>
        <meta
          name="description"
          content="BookYourSeat is a digital platform for booking your bus ticket online easily."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1 className={styles.title}>Welcome to admin dashboard</h1>
        <p className={styles.subTitle}>
          You can click button below to visit the page
        </p>
        <div className={styles.menu}>
          <div className={styles.menuBox}>
            <div
              className={styles.menuItem}
              style={{ borderBottom: "1px solid rgb(190, 190, 190)" }}
              onClick={() => router.push("/dashboard/admin/bus")}
            >
              List Bus
            </div>
            <div
              className={styles.menuItem}
              onClick={() => router.push("/dashboard/admin/bus/create")}
            >
              New Bus
            </div>
          </div>

          <div className={styles.menuBox}>
            <div
              className={styles.menuItem}
              style={{ borderBottom: "1px solid rgb(190, 190, 190)" }}
              onClick={() => router.push("/dashboard/admin/trip")}
            >
              List Trip
            </div>
            <div
              className={styles.menuItem}
              onClick={() => router.push("/dashboard/admin/trip/create")}
            >
              New Trip
            </div>
          </div>

          <div className={styles.menuBox}>
            <div
              className={styles.menuItem}
              onClick={() => router.push("/dashboard/admin/user")}
            >
              List User
            </div>
          </div>
        </div>
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
