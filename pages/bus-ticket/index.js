import { useRouter } from "next/router";

function AllBusTicketPage(props) {
  const router = useRouter();
  const { from, to } = router.query;
  // console.log(router.query)
  console.log(props.trip);
  return (
    <>
      <div>BUS TICKET PAGE</div>
      {from} {to}
    </>
  );
}

export async function getServerSideProps(context) {
  
  const res = await fetch(
    "http://localhost:3000/api/trip?" +
      new URLSearchParams(context.query)
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
