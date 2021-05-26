import db from "../../../db/config";

async function handler(req, res) {
  const trip_id = req.query.tripId;
  if (req.method === "PUT") {
    const bus_id = req.body.bus_id;
    const start = req.body.start;
    const destination = req.body.destination;
    const trip_date = req.body.trip_date;
    const trip_time = req.body.trip_time;
    const drop_time = req.body.drop_time;
    const fare = req.body.fare;

    try {
      await db.query(
        "UPDATE trip SET bus_id=:bus_id, start=:start, destination=:destination, trip_date=:trip_date, trip_time=:trip_time, drop_time=:drop_time, fare=:fare WHERE trip_id=:trip_id;",
        {
          replacements: {
            trip_id: trip_id,
            bus_id: bus_id,
            start: start,
            destination: destination,
            trip_date: trip_date,
            trip_time: trip_time,
            drop_time: drop_time,
            fare: fare,
          },
          type: db.QueryTypes.UPDATE,
        }
      );
      return res
        .status(200)
        .json({ success: 1, message: "Trip updated successfully" });
    } catch (err) {
      return res
        .status(500)
        .json({ success: 0, message: "Error, can't update trip" });
    }
  }

  try {
    let tripdata = await db.query(
      "SELECT * FROM trip JOIN bus ON (trip.bus_id = bus.bus_id) WHERE trip_id=:trip_id;",
      {
        replacements: {
          trip_id: trip_id,
        },
        type: db.QueryTypes.SELECT,
      }
    );

    let busdata = await db.query(
      "SELECT * FROM bus WHERE active=1 ORDER BY bus_id DESC",
      {
        type: db.QueryTypes.SELECT,
      }
    );

    let seatdata = await db.query(
      "SELECT seat.seat_id, seat.seat_code, seat.bus_id, seat.nr, seat.disable FROM seat WHERE seat.bus_id=:bus_id ORDER BY seat.seat_id asc;",
      {
        replacements: {
          bus_id: tripdata[0].bus_id,
        },
        type: db.QueryTypes.SELECT,
      }
    );

    let ticketdata = await db.query(
      "SELECT ticket.*, seat.*, user.name as user_name FROM ticket JOIN seat ON (seat.seat_id=ticket.seat_id) JOIN user ON (ticket.user_id = user.user_id) WHERE ticket.trip_id=:trip_id AND ticket.active=1;",
      {
        replacements: {
          trip_id: trip_id,
        },
        type: db.QueryTypes.SELECT,
      }
    );

    for (let i = 0; i < seatdata.length; i++) {
      for (let j = 0; j < ticketdata.length; j++) {
        if (seatdata[i].seat_code === ticketdata[j].seat_code) {
          seatdata[i].ticket_id = ticketdata[j].ticket_id;
        }
      }
    }

    return res.status(200).json({
      trip: tripdata[0],
      bus: busdata,
      seat: seatdata,
      ticket: ticketdata,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Getting trip failed." });
  }
}
export default handler;
