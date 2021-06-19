import db from "../../../db/config";
import { getSession } from "next-auth/client";

async function handler(req, res) {
  if (req.method === "DELETE") {
    const session = await getSession({ req });

    if (session == null) {
      return res.status(500).json({ message: "user not logged in" });
    }

    if (session.user.role !== 2) {
      return res.status(500).json({ message: "Unauthorized" });
    }

    try {
      await db.query(
        `UPDATE ticket SET active=0 WHERE ticket_id=${req.body.ticket_id}`
      );
      return res
        .status(200)
        .json({ success: 1, message: "Ticket deleted successfully" });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ success: 0, message: "Error, can't delete ticket" });
    }
  }
}

export default handler;
