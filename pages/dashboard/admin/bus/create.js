import Layout from "../../../../components/layout/layout";
import { getSession } from "next-auth/client";
import FormCreateBus from "../../../../components/admin/bus/create/Form";
import styles from "../../../../styles/admin.module.css";

export default function CreateBus() {
  return (
    <Layout admin>
      <div>
        <h1 className={styles.title}>Create New Bus</h1>
        <FormCreateBus />
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
  return {
    props: {},
  };
}
