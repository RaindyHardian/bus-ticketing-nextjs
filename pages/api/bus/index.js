import db from "../../../db/config";
import seatModel from "../../../db/SeatModel";
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

    const type = req.body.type;
    const nopol = req.body.nopol;
    const total_seat = req.body.total_seat;
    const row = req.body.row;
    const col = req.body.col;
    const disEl = req.body.disEl;
    const item = req.body.item;

    try {
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
      for (i = 0; i < seat.length; i++) {
        for (j = 0; j < disEl.length; j++) {
          if (seat[i].nr == disEl[j]) {
            seat[i].disable = 1;
          }
        }
      }

      await seatModel.bulkCreate(seat);

      return res
        .status(200)
        .json({ success: 1, bus: bus_id, message: "Create new bus succeeded" });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ success: 0, message: "Error, can't create new bus" });
    }
  }

  try {
    let data = await db.query(
      `SELECT * FROM bus WHERE active=1 ORDER BY bus_id DESC;`,
      {
        type: db.QueryTypes.SELECT,
      }
    );

    return res.status(200).json({
      success: 1,
      busdata: data,
      dataLength: data.length,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: 0, message: "Failed getting data" });
  }
}

export default handler;
