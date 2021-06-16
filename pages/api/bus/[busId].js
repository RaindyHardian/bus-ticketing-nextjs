import db from "../../../db/config";
import seatModel from "../../../db/SeatModel";
import { getSession } from "next-auth/client";

async function handler(req, res) {
  if (req.method === "PUT") {
    const session = await getSession({ req });

    if (session == null) {
      return res.status(500).json({ message: "user not logged in" });
    }

    const type = req.body.type;
    const nopol = req.body.nopol;
    const total_seat = req.body.total_seat;
    const row = req.body.row;
    const col = req.body.col;
    const disEl = req.body.disEl;
    const item = req.body.item;

    try {
      await db.query(
        `UPDATE bus SET active=0 WHERE bus_id=${req.body.bus_id}`,
        { type: db.QueryTypes.UPDATE }
      );

      let bus_id = await db.query(
        "INSERT INTO bus(type, nopol, total_seat, row, col) VALUES (:type,:nopol,:total_seat, :row, :col);",
        {
          replacements: {
            type: type,
            nopol: nopol,
            total_seat: total_seat,
            row: row,
            col: col,
          },
          type: db.QueryTypes.INSERT,
        }
      );
      console.log(bus_id[0]); //get last inserted id

      let seat = [];
      let i = 0;
      let j = 0;
      let code = 1;
      while (i < item) {
        seat.push({ seat_code: code, bus_id: bus_id[0], nr: i, disable: 0 });
        code++;
        i++;
      }
      var filtered = disEl.filter((e) => e <= row * col);
      for (i = 0; i < seat.length; i++) {
        for (j = 0; j < filtered.length; j++) {
          if (seat[i].nr == filtered[j]) {
            seat[i].disable = 1;
          }
        }
      }

      let resultSeat = await seatModel.bulkCreate(seat);

      return res
        .status(200)
        .json({ success: 1, bus: bus_id, message: "Bus updated successfully" });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ success: 0, message: "Error, can't update bus" });
    }
  }

  const bus_id = req.query.busId;
  try {
    let busData = await db.query("SELECT * FROM bus WHERE bus_id = :bus_id ;", {
      replacements: {
        bus_id: bus_id,
      },
      type: db.QueryTypes.SELECT,
    });
    let seatData = await db.query(
      "SELECT * FROM seat WHERE bus_id = :bus_id ;",
      {
        replacements: {
          bus_id: bus_id,
        },
        type: db.QueryTypes.SELECT,
      }
    );
    return res
      .status(200)
      .json({ success: 1, busdata: busData[0], seatdata: seatData });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: 0, message: "Error, can't get bus" });
  }
}

export default handler;
