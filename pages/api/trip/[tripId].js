import db from "../../../db/config";

async function handler(req, res) {
  const trip_id = req.query.tripId;

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
      "SELECT * FROM ticket JOIN seat ON (seat.seat_id=ticket.seat_id) WHERE trip_id=:trip_id;",
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

    res.status(200).json({
      trip: tripdata[0],
      seat: seatdata,
      ticket: ticketdata,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Getting trip failed." });
  }
}
export default handler;
