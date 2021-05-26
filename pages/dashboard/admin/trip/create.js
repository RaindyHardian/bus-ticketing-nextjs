import Layout from "../../../../components/layout/layout";
import { getSession } from "next-auth/client";
import FormCreateTrip from "../../../../components/admin/trip/create/Form";

export default function CreateTrip(props) {
  const { bus } = props;
  return (
    <Layout admin>
      <div>
        <h1>Create New Trip</h1>
        <FormCreateTrip bus={bus} />
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
      bus: data.busdata,
    },
  };
}
