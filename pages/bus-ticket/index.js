import { useRouter } from "next/router";
import Layout from "../../components/layout/layout";

function AllBusTicketPage(props) {
  const router = useRouter();
  const { from, to } = router.query;
  // console.log(router.query)
  console.log(props.trip);
  return (
    <Layout>
      <div>BUS TICKET PAGE</div>
      {from} {to}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(
    "http://localhost:3000/api/trip?" + new URLSearchParams(context.query)
  );
  const data = await res.json();

  return {
    props: {
      trip: data.trip,
      dataLength: data.dataLength,
      perPage: data.perPage,
    },
  };
}

export default AllBusTicketPage;
