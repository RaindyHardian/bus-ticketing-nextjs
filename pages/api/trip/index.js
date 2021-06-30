import db from "../../../db/config";
import { getSession } from "next-auth/client";

async function handler(req, res) {
  if (req.method === "POST") {
    const session = await getSession({ req });

    if (session == null) {
      return res.status(500).json({ message: "user not logged in" });
    }

    if (session.user.role !== 2) {
      return res.status(500).json({ message: "Unauthorized" });
    }

    const bus_id = req.body.bus_id;
    const start = req.body.start;
    const destination = req.body.destination;
    const trip_date = req.body.trip_date;
    const trip_time = req.body.trip_time;
    const drop_time = req.body.drop_time;
    const fare = req.body.fare;

    try {
      await db.query(
        "INSERT INTO trip(bus_id, start, destination, trip_date,trip_time, drop_time, fare) VALUES (:bus_id,:start,:destination, :trip_date, :trip_time, :drop_time, :fare);",
        {
          replacements: {
            bus_id: bus_id,
            start: start,
            destination: destination,
            trip_date: trip_date,
            trip_time: trip_time,
            drop_time: drop_time,
            fare: fare,
          },
          type: db.QueryTypes.INSERT,
        }
      );
      return res
        .status(200)
        .json({ success: 1, message: "Trip created successfully" });
    } catch (err) {
      return res
        .status(500)
        .json({ success: 0, message: "Error, can't create new trip" });
    }
  }

  try {
    const startFilter = req.query.from ? req.query.from : "";
    const destinationFilter = req.query.to ? req.query.to : "";
    const trip_dateFilter = req.query.trip_date
      ? req.query.trip_date
      : "trip_date";

    let data = await db.query(
      `SELECT * FROM trip JOIN bus ON (trip.bus_id = bus.bus_id)  WHERE start LIKE :start AND destination LIKE :destination AND trip_date=${trip_dateFilter} AND trip.active=1 ORDER BY trip_date ASC;`,
      {
        replacements: {
          start: "%" + startFilter + "%",
          destination: "%" + destinationFilter + "%",
        },
        type: db.QueryTypes.SELECT,
      }
    );

    let currentPage = req.query.page;
    if (currentPage === undefined || currentPage === "") {
      currentPage = 1;
    }
    let perPage = 200;
    let lastIdx = currentPage * perPage;
    let firstIdx = lastIdx - perPage;
    let finalData = data.slice(firstIdx, lastIdx);

    return res.status(200).json({
      trip: finalData,
      dataLength: data.length,
      perPage: perPage,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Getting trip failed." });
  }
}

export default handler;
