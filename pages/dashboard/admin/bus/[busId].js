import FormUpdateBus from "../../../../components/admin/bus/update/Form";
import Layout from "../../../../components/layout/layout";
import { getSession } from "next-auth/client";
import styles from "../../../../styles/admin.module.css";

export default function BusDetail(props) {
  const { bus, seat } = props;
  return (
    <Layout admin>
      <div>
        <h1  className={styles.title}>Update Bus</h1>
        <FormUpdateBus bus={bus} seat={seat} />
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const busId = context.params.busId;

  if (!session) {
    return {
      redirect: {
        destination: "/account/login",
        permanent: false,
      },
    };
  }

  const res = await fetch(`http://localhost:3000/api/bus/${busId}`, {
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

  let bus = data.busdata;
  bus.disEl = [];
  for (let i = 0; i < data.seatdata.length; i++) {
    if (data.seatdata[i].disable == 1) {
      bus.disEl.push(i);
    }
  }
  return {
    props: {
      bus: bus,
      seat: data.seatdata,
    },
  };
}
