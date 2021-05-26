import db from "../../../db/config";
import { getSession } from "next-auth/client";

async function handler(req, res) {
  const session = await getSession({ req });

  if (session == null) {
    return res.status(500).json({ message: "user not logged in" });
  }

  try {
    const startFilter = req.query.start ? req.query.start : "";
    const destinationFilter = req.query.destination
      ? req.query.destination
      : "";
    const trip_dateFilter = req.query.trip_date
      ? req.query.trip_date
      : "trip_date";

    const ticketdata = await db.query(
      `SELECT * FROM ticket JOIN trip ON (trip.trip_id=ticket.trip_id) JOIN seat ON (seat.seat_id=ticket.seat_id) JOIN bus ON (bus.bus_id=seat.bus_id) WHERE trip.start LIKE :start AND trip.destination LIKE :destination AND trip.trip_date=${trip_dateFilter} AND ticket.user_id=:user_id AND ticket.active=1 ORDER BY ticket.ticket_id DESC;`,
      {
        replacements: {
          user_id: session.user.user_id,
          start: "%" + startFilter + "%",
          destination: "%" + destinationFilter + "%",
        },
        type: db.QueryTypes.SELECT,
      }
    );
    let currentPage = req.query.page;
    if (req.query.page === undefined) {
      currentPage = 1;
    }

    let perPage = 20;
    let lastIdx = currentPage * perPage;
    let firstIdx = lastIdx - perPage;
    let finalData = ticketdata.slice(firstIdx, lastIdx);
    res.status(200).json({
      success: 1,
      ticketdata: finalData,
      dataLength: ticketdata.length,
      perPage: perPage,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: 0, message: "Failed getting data" });
  }
}

export default handler;
