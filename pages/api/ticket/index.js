import TicketModel from "../../../db/TicketModel";
import { getSession } from "next-auth/client";

async function handler(req, res) {
  if (req.method === "POST") {
    const session = await getSession({ req: req });
    if (session == null) {
      return res.status(500).json({ message: "user not logged in" });
    }

    const ticket = req.body;
    for (let i = 0; i < req.body.length; i++) {
      ticket[i].user_id = session.user.user_id;
    }

    try {
      await TicketModel.bulkCreate(ticket);
      return res
        .status(201)
        .json({ success: 1, message: "Ticket was succesfully purchased" });
    } catch (err) {
      return res.status(500).json({
        success: 0,
        message: "Inserting data failed, there's an error",
      });
    }
  }
}

export default handler;
